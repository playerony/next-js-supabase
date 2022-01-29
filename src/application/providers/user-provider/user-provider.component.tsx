import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { supabaseInstance, UserContext } from '@infrastructure';

import { IUserProviderProps } from './user-provider.types';

export const UserProvider = ({ children }: IUserProviderProps): JSX.Element => {
  const router = useRouter();
  const [user, setUser] = useState(supabaseInstance.auth.user());

  const getUserProfile = async () => {
    const sessionUser = supabaseInstance.auth.user();

    if (sessionUser) {
      const { data: profile } = await supabaseInstance
        .from('profile')
        .select('*')
        .eq('id', sessionUser.id)
        .single();

      setUser({
        ...sessionUser,
        ...profile,
      });
    }
  };

  useEffect(() => {
    getUserProfile();

    supabaseInstance.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, []);

  const login = () =>
    supabaseInstance.auth.signIn({
      provider: 'github',
    });

  const logout = () =>
    supabaseInstance.auth.signOut().then(() => {
      setUser(null);
      router.push('/');
    });

  const providerValue = {
    user,
    login,
    logout,
  };

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
};
