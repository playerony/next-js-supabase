import { Stripe } from 'stripe';

import { IPricingProps } from './pricing.types';

export const Pricing = ({ plans }: IPricingProps): JSX.Element => (
  <div className="w-full max-w-3xl mx-auto py-16 flex justify-around">
    {plans.map((_plan) => (
      <div key={_plan.id} className="w-80 h-40 rounded shadow px-6 py-4">
        <h2 className="text-xl">{_plan.name}</h2>
        <p className="text-gray-500">
          {_plan.price / 100} / {_plan.interval}
        </p>
      </div>
    ))}
  </div>
);

export const getStaticProps = async () => {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2020-08-27' });

  const { data: prices } = await stripe.prices.list();

  const plans = await Promise.all(
    prices.map(async (_price) => {
      const product = await stripe.products.retrieve(_price.product.toString());

      return {
        id: _price.id,
        name: product.name,
        currency: _price.currency,
        price: _price.unit_amount,
        interval: _price.recurring?.interval,
      };
    }),
  );

  const sortedPlans = plans.sort((a, b) => (a.price || 0) - (b.price || 0));

  return {
    props: {
      plans: sortedPlans,
    },
  };
};
