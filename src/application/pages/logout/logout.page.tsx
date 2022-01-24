import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { supabaseInstance } from '@infrastructure';

export const Logout = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    supabaseInstance.auth.signOut().then(() => {
      router.push('/');
    });
  }, []);

  return <p>Logging out</p>;
};
