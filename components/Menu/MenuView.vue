<script setup lang="ts">
import type { PrettifiedData } from "~/types";

const props = defineProps<{
  menus: PrettifiedData
}>();

const sortedDates = computed(() => { // sort dates by time
  return Object.keys(props.menus).sort((a: string, b: string) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });
});
</script>

<template>
  <div v-for="date in sortedDates" :key="date">
    <MenuDateButton :date="date" />
    <MenuList :meals="menus[date]" :date="date" />
  </div>
</template>


<style scoped>
.title {
  font-size: 1.5em;
}
</style>
