// server/push.ts
import { createClient } from "@supabase/supabase-js";

const ALLERGENS_AND_PREFERENCE_FIELDS = [
  "has_dairy",
  "has_egg",
  "has_fish",
  "has_peanut",
  "has_sesame",
  "has_soy",
  "has_tree_nut",
  "has_wheat",
  "has_shellfish",
  "may_contain_dairy",
  "may_contain_egg",
  "may_contain_peanut",
  "may_contain_sesame",
  "may_contain_soy",
  "may_contain_tree_nut",
  "may_contain_wheat",
  "is_vegetarian",
  "is_vegan",
  "is_gluten_sensitive",
  "is_nutrigood",
]

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.supabaseUrl || !body.supabaseKey) {
    return { status: 401, body: { error: "Missing Supabase credentials" } };
  }

  const supabase = createClient(body.supabaseUrl, body.supabaseKey);

  let payload = {
    date: body.date,
    dhall: body.dhall,
    meal: body.meal,
    name: body.name,
    description: body.description,
    station: body.station,
    stationOrder: body.stationOrder,
  };
  ALLERGENS_AND_PREFERENCE_FIELDS.forEach(field => {
    if (field in body) {payload[field] = true;}
  });

  const { data, error } = await supabase
    .from('Menu')
    .insert([payload])
    .select();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
});