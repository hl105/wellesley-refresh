<script setup lang="ts">
const props = defineProps({
  meals: Object, 
  date: String
});

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const sortedMeals = ["breakfast", "lunch", "brunch", "dinner"];
</script>

<template>
  <div v-if="props.meals">
    <div v-for="meal in sortedMeals">
      <div v-if="props.meals[meal]">
        <h1 class="title" :id="`${String(date)}-${meal}`">{{ capitalize(meal) }}</h1>
        <div class="grid grid-cols1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto my-8">
        <div v-for="(items, dhall) in props.meals[meal]" :key="dhall">
            <MenuComponent :dhall="String(dhall)" :dhallMenu="items" />
          </div>
        </div>
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
