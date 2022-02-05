/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface ProcessEnv {
    API_ROUTE_SECRET: string;
    NEXT_PUBLIC_STRIPE_KEY: string;
    NEXT_PUBLIC_SUPABASE_KEY: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    STRIPE_SECRET_KEY: string;
    STRIPE_SECRET_KEY: string;
    STRIPE_SIGNING_SECRET: string;
    STRIPE_SIGNING_SECRET: string;
    SUPABASE_SERVICE_KEY: string;
    SUPABASE_SERVICE_KEY: string;
  }
}
