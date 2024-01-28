import { createClient, SupabaseClient } from '@supabase/supabase-js';

interface SupabaseUrl {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
}
const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'] as string;
const supabaseAnonKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] as string;

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
) as SupabaseClient;
