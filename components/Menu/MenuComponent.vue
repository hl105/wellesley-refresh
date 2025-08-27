<script setup lang="ts">
import { toggled } from '@/composables/useToggle';

defineProps<{
  dhall: string;
  dhallMenu: Record<string, any>;
}>();

const showDish = ref(false);
var showDishName = null;
var showDishDetails = null;
</script>

<template>
  <div class="menu-container">
    <h1 class="menu-title">{{ dhall }}</h1>
    <div>
      <div v-if="Object.keys(dhallMenu).length === 0" class="station">
        Menu not available :(
      </div>
      <div v-for="(dishes, station) in dhallMenu" :key="station">
        <template v-if="station !== 'order'">
          <div class="station">
            <h2 class="station-title"><span>{{ station }}</span></h2>
            <ul class="dish-list">
              <div v-for="(details, dishName) in dishes" :key="dishName">
                <button class="dish-item" @click="showDishName = dishName; showDishDetails = details; showDish = true">
                  {{ dishName }}
                
                  <div v-if="toggled" class="icon-container">
                    <div class="tooltip" v-for="preference in details.preferences">
                      <img :key="preference.id" :src="preference.img" :alt="preference.name" class="icon" />
                      <span class="tooltiptext">{{ preference.name }}</span>
                    </div>
                    <div class="tooltip" v-for="allergen in details.allergens">
                      <img :key="allergen.id" :src="allergen.img" :alt="allergen.name" class="icon" />
                      <span class="tooltiptext">{{ allergen.name }}</span>
                    </div>
                  </div>
                </button>
              </div>
            </ul>
          </div>
        </template>
      </div>
    </div>
    
    <PopupDish v-if="showDish" :name="showDishName" :details="showDishDetails" @close="showDish = false" />
  </div>
</template>

<style scoped>
.menu-container {
  padding: 1.5em 1em 0.1em .8em;
  border-radius: 10px;
  border: 3px dotted #687350;
  position: relative;

}

.menu-title {
  position: absolute;
  background-color: #fff2e2;
  padding: 3px 10px;
  border-radius: 20px;
  border: 3px solid #687350;
  top: -20px;
  left: 5px;
}

p {
  font-size: 0.8em;
}

ul .dish-list {
  padding-bottom: 0px;
}

.station {
  margin-bottom: 15px;
  display: block;
}

.station-title {
  margin-bottom: .5em;
  font-size: 1em;
  /* text-decoration:underline wavy #687350; */
}

.station-title span {
  position: relative;
  display: inline-block;
}

.station-title span::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0; /* adjust vertically as needed */
  width: 100%;
  height: 10px;
  transform: skew(-12deg) translateX(-50%);
  background: rgba(117, 168, 96, 0.5);
  z-index: -1;
}

h2 {
  font-size: 0.8em;
}

.dish-item {
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 5px;
  width: fit-content;
  line-height: 1em;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 3px;
  padding: .2em;
  padding-bottom: .15em;
  text-align: left;
  cursor: pointer;
}

.dish-item:hover {
  background-color: var(--transparent-green);
  border-radius: .5em;
}

.icon {
  width: 10px;
  height: 10px;
  opacity: 0.8;
}

.icon-container {
  display: flex;
  flex-direction: row;
  gap: 3px;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  font-size: .8em;
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  top: 150%;
  left: 50%;
  margin-left: -60px;
  font-family: 'DynaPuff';
  z-index: 1;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
