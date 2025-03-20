<script setup lang="ts">
defineProps({ dhall: String, dhallMenu: Object });
</script>

<template>
  <div class="menu-container">
    <h1 class="menu-title">{{ dhall }}</h1>
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
        <br />
      </template>
    </div>
  </div>
</template>

<style scoped>
.menu-container {
  padding: 1em;
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
</style>
