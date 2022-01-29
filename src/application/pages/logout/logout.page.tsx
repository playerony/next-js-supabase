import { useEffect } from 'react';

import { useUser } from '@utils';

export const Logout = (): JSX.Element => {
  const { logout } = useUser();

  useEffect(() => {
    logout();
  }, []);

  return <p>Logging out</p>;
};
