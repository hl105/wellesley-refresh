// import { createClient } from "@supabase/supabase-js";

// export default defineNuxtPlugin((nuxtApp) => {
//   const config = useRuntimeConfig();

//   // Correctly fetch the values
//   const supabaseUrl = config.supabaseUrl; 
//   const supabaseKey = config.supabaseKey; 

//   console.log("Supabase URL:", supabaseUrl);
//   console.log("Supabase Key:", supabaseKey ? "Loaded" : "Missing");

//   const supabase = createClient(supabaseUrl, supabaseKey);

//   return {
//     provide: {
//       supabase,
//     },
//   };
// });