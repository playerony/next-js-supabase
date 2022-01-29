import { useEffect } from 'react';

import { useUser } from '@utils';

export const Login = (): JSX.Element => {
  const { login } = useUser();

  useEffect(() => {
    login();
  }, []);

  return <p>Logging in</p>;
};
