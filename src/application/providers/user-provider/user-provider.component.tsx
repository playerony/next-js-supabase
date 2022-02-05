import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { IUser, UserContext, supabaseInstance } from '@infrastructure';

import { IUserProviderProps } from './user-provider.types';

export const UserProvider = ({ children }: IUserProviderProps): JSX.Element => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(supabaseInstance.auth.user());

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

      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();

    supabaseInstance.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, []);

  useEffect(() => {
    axios.post('/api/set-supabase-cookie', {
      event: user ? 'SIGNED_IN' : 'SIGNED_OUT',
      session: supabaseInstance.auth.session(),
    });
  }, [user]);

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
    isLoading,
  };

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
};
