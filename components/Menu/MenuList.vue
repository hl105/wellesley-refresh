<script setup lang="ts">
const { selectedDiningHalls, updateColumnSizes } = useLocationFilter()

updateColumnSizes();

const props = defineProps({
  meals: Object, 
  date: String
});

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const dhalls = ["Bates", "Stone D", "Lulu", "Tower"];

const sortedMeals = ["breakfast", "lunch", "brunch", "dinner"];
</script>

<template>
  <div v-if="props.meals">
    <div v-for="meal in sortedMeals">
      <div v-if="props.meals[meal]">
        <h1 class="title" :id="`${String(date)}-${meal}`">{{ capitalize(meal) }}</h1>
        <div :class="`grid grid-cols-1 sm:grid-cols-(--sm-num-cols) lg:grid-cols-(--lg-num-cols) gap-6 max-w-6xl mx-auto my-8`">
          <div class="dhall-section" :id="String(dhall)" v-for="dhall in dhalls" :key="dhall">
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

#Bates {
  display: var(--display-bates);
}

#Stone\ D {
  display: var(--display-stoned);
}

#Lulu {
  display: var(--display-lulu);
}

#Tower {
  display: var(--display-tower);
}
</style>