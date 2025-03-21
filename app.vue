<script setup> 
import { Analytics } from '@vercel/analytics/nuxt'
import { SpeedInsights } from "@vercel/speed-insights/nuxt"

</script>

<template>
  <Analytics/>
  <SpeedInsights/>
  <div>
    <NuxtPage/>
  </div>
</template>