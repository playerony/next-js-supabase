import { User } from '@supabase/supabase-js';

export interface IUser extends User {
  is_subscribed?: boolean;
}

export interface IUserContextValue {
  user: IUser | null;
  isLoading: boolean;

  login: () => void;
  logout: () => void;
}
