import { IAppProps } from './app.types';

import { Nav } from '@components';

import { UserProvider } from '../providers';

export const App = ({ Component, pageProps }: IAppProps): JSX.Element => (
  <UserProvider>
    <Nav />
    <Component {...pageProps} />
  </UserProvider>
);
