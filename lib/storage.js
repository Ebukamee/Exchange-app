import { createClient } from "@supabase/supabase-js";

// Service-role Supabase client for server-side Storage uploads only.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
);

export const PROOFS_BUCKET = "proofs";

