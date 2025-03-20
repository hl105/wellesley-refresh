<script setup lang="ts">
defineProps({
  date: String,
  meals: Object, 
});

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
</script>

<template>
  <div v-for="(menus, meal) in meals" :key="meal">
    <h1 class="title">{{ capitalize(meal) }}</h1>
    <div class="menu-grid">
      <div v-for="(items, dhall) in menus" :key="dhall">
        <MenuComponent :dhall="dhall" :dhallMenu="items" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 1.5em;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5em;
  margin: 2em auto;
  max-width: 1200px;
}
</style>
