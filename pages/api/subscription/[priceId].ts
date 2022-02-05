/* eslint-disable unicorn/filename-case */
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { Stripe } from 'stripe';

import { supabaseInstance } from '@infrastructure';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { user } = await supabaseInstance.auth.api.getUserByCookie(request);

  if (!user) {
    response.status(401).send('Unauthorized');

    return;
  }

  const token = cookie.parse(request.headers.cookie || '')['sb:token'];

  supabaseInstance.auth.session = () => ({
    user,
    token_type: '',
    access_token: token,
  });

  const {
    data: { stripe_customer },
  } = await supabaseInstance.from('profile').select('stripe_customer').eq('id', user.id).single();

  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2020-08-27' });
  const { priceId } = request.query as { priceId: string };

  const lineItems = [
    {
      quantity: 1,
      price: priceId,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: lineItems,
    customer: stripe_customer,
    payment_method_types: ['card'],
    cancel_url: 'http://localhost:3000/payment/cancel',
    success_url: 'http://localhost:3000/payment/success',
  });

  response.send({
    id: session.id,
  });
};

export default handler;
