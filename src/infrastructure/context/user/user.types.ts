import { User } from '@supabase/supabase-js';

export interface IUser extends User {
  interval?: boolean;
  is_subscribed?: boolean;
}

export interface IUserContextValue {
  isLoading: boolean;
  login: () => void;

  logout: () => void;
  user: IUser | null;
}
