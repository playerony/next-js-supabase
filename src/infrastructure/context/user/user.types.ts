import { User } from '@supabase/supabase-js';

export interface IUserContextValue {
  user: User | null;

  login: () => void;
  logout: () => void;
}
