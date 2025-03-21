<script setup lang="ts">
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
    <SelectDateButtonList :dates="Object.keys(menus).sort()" />
    <div class="main-elements">
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
  flex-direction: column;
  height: 80px;
  margin-top: 15px;
}

.logo {
  width: 200px;
  height: auto;
}

.main-elements {
  max-width: 1200px;
  margin: auto;
  padding: 1em;
  margin-top: -70px;
}
</style>