import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NUXT_SUPABASE_URL ?? "";

const supabaseKey = process.env.NUXT_SUPABASE_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseKey);