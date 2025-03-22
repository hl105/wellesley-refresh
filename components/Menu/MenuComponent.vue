<script setup lang="ts">
import { toggled } from '@/composables/useToggle';

defineProps<{
  dhall: string;
  dhallMenu: Record<string, any>;
}>();

</script>

<template>
  <div class="menu-container">
    <h1 class="menu-title">{{ dhall }}</h1>
    <div>
      <div v-if="Object.keys(dhallMenu).length === 0" class="station">
        No menu items :(
      </div>
      <div v-for="(dishes, station) in dhallMenu" :key="station">
        <template v-if="station !== 'order'">
<<<<<<< HEAD
          <h2 class="station-title"><span>{{ station }}</span></h2>
          <ul class="dish-list">
            <div v-for="(details, dishName) in dishes" :key="dishName" class="dish-item">
              <p>{{ dishName }}</p>
              <div v-if="toggled" class="more-options">
                <img v-for="preference in details.preferences" :key="preference.id" :src="preference.img"
                  :alt="preference.name" class="icon" />
                <img v-for="allergen in details.allergens" :key="allergen.id" :src="allergen.img" :alt="allergen.name"
                  class="icon" />
=======
          <div class="station">
            <h2 class="station-title">{{ station }}</h2>
            <ul class="dish-list">
              <div v-for="(details, dishName) in dishes" :key="dishName" class="dish-item">
                <p>{{ dishName }}</p>
                <div v-if="toggled" class="more-options">
                  <img v-for="preference in details.preferences" :key="preference.id" :src="preference.img"
                    :alt="preference.name" class="icon" />
                  <img v-for="allergen in details.allergens" :key="allergen.id" :src="allergen.img" :alt="allergen.name"
                    class="icon" />
                </div>
>>>>>>> 9b217262d3f5e96b0b693a0e3da6dc9084e38b99
              </div>
            </ul>
          </div>
        </template>
      </div>
    </div>
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
  padding-bottom: .2em;
  line-height: 1em;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 5px;
}

.icon {
  width: 10px;
  height: 10px;
  opacity: 0.8;
}

.more-options {
  display: flex;
  flex-direction: row;
  gap: 3px;
}
</style>
