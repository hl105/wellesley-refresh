// server/api/delete.ts
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.supabaseUrl || !body.supabaseKey) {
    return { status: 401, body: { error: "Missing Supabase credentials" } };
  }

  const supabase = createClient(body.supabaseUrl, body.supabaseKey);
  const { error } = await supabase
    .from('Menu')
    .delete()            
    .not('date', 'is', null);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
});