<script setup lang="ts">
import { ref } from 'vue'

const { selectedDiningHalls, setSelectedLocations } = useLocationFilter()

const props = defineProps({
  meals: Object, 
  date: String
});

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const selectedHalls = ref(selectedDiningHalls.value)

const sortedMeals = ["breakfast", "lunch", "brunch", "dinner"];

const lg_num_cols = `repeat(${selectedHalls.length}, minmax(0, 1fr))`;
const sm_num_cols = `repeat(${Math.floor(selectedHalls.length / 2)}, minmax(0, 1fr))`;
</script>

<template>
  <div v-if="props.meals" ref="container">
    <div v-for="meal in sortedMeals">
      <div v-if="props.meals[meal]">
        <h1 class="title" :id="`${String(date)}-${meal}`">{{ capitalize(meal) }}</h1>
        <div :class="`grid grid-cols-1 sm:grid-cols-(--sm-num-cols) lg:grid-cols-(--lg-num-cols) gap-6 max-w-6xl mx-auto my-8`"
          :style="{ '--lg-num-cols': lg_num_cols, '--sm-num-cols': sm_num_cols}">
          <div v-for="dhall in selectedHalls" :key="dhall">
            <MenuComponent :dhall="String(dhall)" :dhallMenu="props.meals[meal][dhall]" />
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
