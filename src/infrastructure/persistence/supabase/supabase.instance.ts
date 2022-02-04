import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

export const supabaseInstance = createClient(supabaseUrl, supabaseKey);

export const getServiceSupabase = () => createClient(supabaseUrl, supabaseServiceKey);
