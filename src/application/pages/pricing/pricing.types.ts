interface IPlan {
  currency: string;
  id: string;
  interval: string;
  name: string;
  price: number;
}

export interface IPricingProps {
  plans: IPlan[];
}
