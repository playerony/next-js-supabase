import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next';
import { Stripe } from 'stripe';

import { getServiceSupabase } from '@infrastructure';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const config = { api: { bodyParser: false } };

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2020-08-27' });
  const signature = request.headers['stripe-signature'];
  const requestBuffer = await buffer(request);

  if (!signature) {
    response.send({ received: true });

    return;
  }

  try {
    const event = stripe.webhooks.constructEvent(
      requestBuffer,
      signature,
      process.env.STRIPE_SIGNING_SECRET,
    );

    switch (event.type) {
      case 'customer.subscription.created':
        await getServiceSupabase()
          .from('profile')
          .update({
            is_subscribed: true,
            // @ts-expect-error
            interval: event.data.object.items.data[0].plan.interval,
          })
          // @ts-expect-error
          .eq('stripe_customer', event.data.object.customer);
        break;

      default:
        break;
    }
  } catch (error) {
    if (error instanceof Error) {
      response.status(400).send(`Webhook error: ${error?.message}`);
    }

    response.status(400).send('Webhook error');
  }

  response.send({ received: true });
};

export default handler;
