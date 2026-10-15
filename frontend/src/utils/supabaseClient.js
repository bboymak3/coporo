import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  // No se lanza error para no romper la app en dev, pero se advierte.
  console.warn('Supabase: REACT_APP_SUPABASE_URL or REACT_APP_SUPABASE_KEY is not set. Check .env.local');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
