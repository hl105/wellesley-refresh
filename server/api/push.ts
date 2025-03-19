// server/push.ts
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.supabaseUrl || !body.supabaseKey) {
    return { status: 401, body: { error: "Missing Supabase credentials" } };
  }

  const supabase = createClient(body.supabaseUrl, body.supabaseKey);

  const { data, error } = await supabase
    .from('Menu')
    .insert([{ dhall: body.dhall }])
    .select();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
});