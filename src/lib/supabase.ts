import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Booking {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  branch: string;
  service_type: string;
  service_name: string;
  service_price: number;
  preferred_date: string;
  preferred_time: string;
  notes: string;
  payment_method: string;
  status: string;
}
