<script setup lang="ts">
defineProps<{
  dhall: string;
  dhallMenu: Record<string, any>;
}>();
</script>

<template>
  <div class="menu-container">
    <h1 class="menu-title">{{ dhall }}</h1>
    <div>
      <div v-if="Object.keys(dhallMenu).length === 0">
        No menu items :(
      </div>
      <div v-for="(dishes, station) in dhallMenu" :key="station">
        <template v-if="station !== 'order'">
          <h2 class="station-title">{{ station }}</h2>
          <ul class="dish-list">
            <li
              v-for="(details, dishName) in dishes"
              :key="dishName"
              class="dish-item"
            >
              <p>{{ dishName }}</p>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-container {
  padding: 1.5em 1em 1em .8em;
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

.dish-item {
  padding-bottom: .5em;
  line-height: 1em;
}

ul .dish-list {
  padding-bottom: 0px;
}

h2 {
  font-size: 0.8em;
}
</style>
