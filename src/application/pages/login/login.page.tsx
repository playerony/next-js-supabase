import { useEffect } from 'react';

import { supabaseInstance } from '@infrastructure';

export const Login = (): JSX.Element => {
  useEffect(() => {
    supabaseInstance.auth.signIn({
      provider: 'github',
    });
  }, []);

  return <p>Logging in</p>;
};
