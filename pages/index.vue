<script setup lang="ts">
import { toRaw } from "vue";

const now: Date = new Date();
const { data: menu, error } = await getMenusByDate(now);


const menus = computed(() => menu.value)
// console.log("menus", menus.value);
</script>

<template>
  <NuxtLink to="/" class="title-container">
    <img src="~/assets/images/logo.png" alt="Wellesley Refresh Logo" class="logo">
  </NuxtLink>
  <div v-if="menus">
    <Navbar class="block md:hidden" :dates="Object.keys(menus).sort()" />
    <div class="main-elements">
      <SelectDateButtonList class="hidden md:block" :dates="Object.keys(menus).sort()" />
      <MenuView :menus="menus" />
    </div>
    <FooterComponent />
  </div>
</template>

<style scoped>
.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border-bottom: 3px dotted #687350;
}

.logo {
  width: 200px;
  height: auto;
}

.main-elements {
  max-width: 1200px;
  margin: auto;
  padding: 1em;
}
</style>