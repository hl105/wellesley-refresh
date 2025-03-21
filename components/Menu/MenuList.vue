<script setup lang="ts">
defineProps({
  meals: Object, 
});

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
</script>

<template>
  <div v-for="(menus, meal) in meals" :key="meal">
    <h1 class="title">{{ capitalize(meal) }}</h1>
    <div class="grid grid-cols1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto my-8">
      <div v-for="(items, dhall) in menus" :key="dhall">
        <MenuComponent :dhall="String(dhall)" :dhallMenu="items" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 1.5em;
  margin-top: 0.5em;
}
</style>
