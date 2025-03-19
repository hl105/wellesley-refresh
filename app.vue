
<script setup>
  import { createClient } from "@supabase/supabase-js";
  const config = useRuntimeConfig();  
  const supabaseUrl = config.public.supabaseUrl; 
  const supabaseKey = config.public.supabaseKey; 
  const supabase = createClient(supabaseUrl, supabaseKey);

  const menu = ref([])
  const items = ref([])

  async function getMenu() {
    let { data, error } = await supabase
      .from('Menu')
      .select('*')
          
    menu.value = data
  }

  onMounted(() => {
    getMenu()
  })

  let {dish, err} = await supabase.from('Dish').select('*')
  
</script>

<template>
  <h1>Wellesley Refresh</h1>
  <ul>
    <!-- {{food}} -->
    <li v-for="m in menu" :key="m.id">{{ m }}</li>
  </ul>
</template>