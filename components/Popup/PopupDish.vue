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
          


          <NutritionTable :nutritionals="details.nutritionals" />
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

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.8);
}

.popup-content {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  gap: 0.8em;
  background-color: #fff2e2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1em;
  /* padding: 1em; */
  border-width: 3px;
  border-color: black;
  padding-top: 2em;
  max-width: 80%;
  max-height: 85%;
  overflow: hidden;
}

.close-button {
  font-family: 'DynaPuff';
  background-color: #fff2e2;
  border-radius: 1em;
  padding: 2px;
  padding-left: 10px;
  padding-right: 10px;
  position: absolute; top: 8px; right: 8px;
}

.close-button:hover {
    background-color: #D3D3D3;
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