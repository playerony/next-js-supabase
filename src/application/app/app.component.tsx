import { Nav } from '@components';

import { UserProvider } from '../providers';
import { IAppProps } from './app.types';

export const App = ({ Component, pageProps }: IAppProps): JSX.Element => (
  <UserProvider>
    <Nav />
    <Component {...pageProps} />
  </UserProvider>
);
