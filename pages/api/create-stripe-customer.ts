import { Stripe } from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseInstance } from '@infrastructure';

const apiRouteSecret = process.env.API_ROUTE_SECRET;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.query.API_ROUTE_SECRET !== apiRouteSecret) {
    return response.status(401).send('UNAUTHORIZED');
  }

  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2020-08-27' });

  const customer = await stripe.customers.create({
    email: request.body.record.email,
  });

  await supabaseInstance
    .from('profile')
    .update({
      stripe_customer: customer.id,
    })
    .eq('id', request.body.record.id);

  response.send({ message: `stripe customer created with id: '${customer.id}'` });
};

export default handler;
