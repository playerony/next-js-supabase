import type { AppProps } from 'next/app';

import '@infrastructure/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
