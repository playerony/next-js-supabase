interface IPlan {
  id: string;
  name: string;
  price: number;
  interval: string;
  currency: string;
}

export interface IPricingProps {
  plans: IPlan[];
}
