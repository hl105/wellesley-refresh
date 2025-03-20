<script setup lang="ts">
import { toRaw } from "vue";

const now: Date = new Date();
const today: Date = now.toISOString().split('T')[0];

const getDates = (date: Date): string[] => {
  const dates: string[] = [];

  for (let i = 0; i < 4; i++) {
    const currentDate = new Date(date);
    currentDate.setDate(date.getDate() + i);
    dates.push(currentDate.toISOString().split('T')[0]);
  }

  return dates;
};

const getCurrentMeal = () => {
  const hour = now.getHours();

  if (hour < 10) {
    return "breakfast";
  } else if (hour < 14) {
    return "lunch";
  } else {
    return "dinner";
  }
};

const { data: menu, error } = await getMenuByDateLocMeal(today);

const menus = toRaw(menu.value)

console.log(menus)

</script>

<template>
  <Navbar class="block md:hidden" :dates="Object.keys(menus)" />
  <NuxtLink to="/" class="title-container">
    <img src="~/assets/images/logo.png" alt="Wellesley Refresh Logo" class="logo">
  </NuxtLink>
  <div class="main-elements">
    <HeroComponent class="hidden md:block" :dates="Object.keys(menus)" />
    <MenuDisplay :menus="menus" />
  </div>
  <FooterComponent />
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