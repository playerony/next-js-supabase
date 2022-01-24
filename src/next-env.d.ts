/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_KEY: string;
  }
}
