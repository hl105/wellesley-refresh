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
  margin-top: .2em;
  font-size: 1em;
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
