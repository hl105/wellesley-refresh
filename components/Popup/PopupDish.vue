<script setup>
const emit = defineEmits(['close'])

const props = defineProps({
  name: String,
  details: Object
});
</script>

<template>
  <div class="popup-overlay" @click="emit('close')">
    <div class="popup-content" @click.stop>
      <main>
        <button class="close-button" @click="emit('close')">X</button>
        <h1>{{ name }}</h1>
        <h2 v-if="details.description">{{ details.description }}</h2>

        <div class="details">
          <div class="allergens-and-preferences">
            <h3 v-if="details.allergens.length > 0">Allergens</h3>
            <div class="grid">
              <div class="attribute" v-for="allergen in details.allergens">
                <img :key="allergen.id" :src="allergen.img" :alt="allergen.name" class="icon" />
                <p class="attribute-name">{{ allergen.name }}</p>
              </div>
            </div>

            <h3 v-if="details.preferences.length > 0">Preferences</h3>
            <div class="grid">
              <div class="attribute" v-for="preference in details.preferences">
                <img :key="preference.id" :src="preference.img" :alt="preference.name" class="icon" />
                <p class="attribute-name">{{ preference.name }}</p>
              </div>
            </div>
          </div>
          
          <NutritionFacts :nutritionals="details.nutritionals" />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
h1, h2, h3 {
  text-align: center;
  line-height: 1.2;
}

h1 {
  font-size: 2.5em;
  margin: 0 .4em .3em;
}

h2 {
  background-color: var(--green);
  border-radius: 1em;
  color: white;
  font-size: 1.2em;
  margin: 0 10%;
  padding: .5em;
}

h3 {
  font-size: 1.5em;
  margin: .5em 0;
}

@media (max-width: 500px) {
  h1 {
    font-size: 1.8em;
  }

  h2 {
    font-size: 1em;
  }
}

main {
  overflow: auto;
  width: 100%;
}

.details {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.popup-content {
  padding: 0;
  max-width: 80%;
  max-height: 85%;
  overflow: hidden;
}

.space {
  height: .5em;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 20em;
}

p {
  font-size: 11px;
}

.allergens-and-preferences {
  margin: 1em;
}

.icon {
  width: 3em;
  margin: auto;
}

.attribute {
  width: 5em;
  margin: 0.5em;
  text-align: center;
}

.attribute-name {
  font-size: 16px;
  line-height: 1;
  margin: .2em 0;
}
</style>