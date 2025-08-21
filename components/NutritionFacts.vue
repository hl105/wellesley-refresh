<script setup>
const props = defineProps({
  nutritionals: Object
});

// from https://www.fda.gov/food/nutrition-facts-label/daily-value-nutrition-and-supplement-facts-labels
const DAILY_VALUES = {
  fat: 78, // g
  saturated_fat: 20, // g
  cholesterol: 300, // mg
  sodium: 2300, // mg
  carbohydrates: 275, // g
  dietary_fiber: 28, // g
  added_sugar: 50, // g
  protein: 50, // g
}

function percentify(num) {
  return Math.round(num * 100) + "%"
}
</script>

<template>
  <div class="nutrition-box">
    <h1>Nutrition Facts</h1>
    <h2>Serving size: {{ nutritionals.serving_size }} {{ nutritionals.serving_size_unit }}</h2>

    <div class="thick-separator"></div>

    Amount per serving

    <div class="entry">
      <p><b>Calories</b></p>
      <p class="calories"><b>{{ nutritionals.calories }}</b></p>
    </div>

    <div class="thin-separator"></div>

    <p class="daily-value-header">Daily Value</p>

    <div class="entry">
      <p><b>Total Fat</b> {{ nutritionals.fat }}g</p>
      <p>{{ percentify(nutritionals.fat / DAILY_VALUES.fat) }}</p>
    </div>
    <div class="indented entry">
      <p><b>Saturated Fat</b> {{ nutritionals.saturated_fat }}g</p>
      <p>{{ percentify(nutritionals.saturated_fat / DAILY_VALUES.saturated_fat) }}</p>
    </div>
    <div class="indented entry">
      <p><b>Trans Fat</b> {{ nutritionals.trans_fat }}g</p>
    </div>

    <div class="entry">
      <p><b>Cholesterol</b> {{ nutritionals.cholesterol }}mg</p>
      <p>{{ percentify(nutritionals.cholesterol / DAILY_VALUES.cholesterol) }}</p>
    </div>

    <div class="entry">
      <p><b>Sodium</b> {{ nutritionals.sodium }}mg</p>
      <p>{{ percentify(nutritionals.sodium / DAILY_VALUES.sodium) }}</p>
    </div>

    <div class="entry">
      <p><b>Total Carbohydrate</b> {{ nutritionals.carbohydrates }}g</p>
      <p>{{ percentify(nutritionals.carbohydrates / DAILY_VALUES.carbohydrates) }}</p>
    </div>
    <div class="indented entry">
      <p><b>Dietary Fiber</b> {{ nutritionals.dietary_fiber }}g</p>
      <p>{{ percentify(nutritionals.dietary_fiber / DAILY_VALUES.dietary_fiber) }}</p>
    </div>
    <div class="indented entry">
      <p><b>Total Sugar</b> {{ nutritionals.sugars }}g</p>
    </div>
    <div class="indented entry">
      <p><b>Added Sugar</b> {{ nutritionals.added_sugar }}g</p>
      <p>{{ percentify(nutritionals.added_sugar / DAILY_VALUES.added_sugar) }}</p>
    </div>

    <div class="entry">
      <p><b>Protein</b> {{ nutritionals.protein }}g</p>
      <p>{{ percentify(nutritionals.protein / DAILY_VALUES.protein) }}</p>
    </div>

    <div class="thin-separator"></div>

    <p class="disclaimer">Percent Daily Values are based on the values for daily intake as <a href="https://www.fda.gov/food/nutrition-facts-label/daily-value-nutrition-and-supplement-facts-labels">recommended by the FDA</a>. Your specific needs may vary.</p>

  </div>

</template>

<style scoped>
h1, h2 {
  text-align: center;
}

h1 {
  font-size: 1.8em;
  margin-bottom: -.2em;
}

h2 {
  font-size: 1.2em;
}

a {
  color: var(--darker-green);
  text-decoration: underline;
}

.calories {
  font-size: 2em;
  margin-bottom: -.2em;
}

.nutrition-box {
  width: 20em;
  min-width: 18em;
  height: 35em;
  min-height: 32em;
  padding: 10px;
  border-radius: 1em;
  border: 3px solid var(--darker-green);
  background-color: var(--background-shaded);
  margin: 1em;
}

.entry {
  border-top: .15em solid var(--darker-green);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.thinner-separator, .thin-separator, .thick-separator {
  background-color: var(--darker-green);
  margin: .4em 0;
}

.thin-separator {
  height: 0.4em;
}

.thick-separator {
  height: 0.8em;
}

.indented {
  margin-left: 0.5em;
}

.more-indented {
  margin-left: 1em;
}

.daily-value-header {
  text-align: right;
}

.disclaimer {
  font-size: 0.8em;
  line-height: 1.1em;
  margin: 0 2%;
  padding-top: 0;
}
</style>
