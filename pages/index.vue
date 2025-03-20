<script setup lang="ts">

// TODO: DATE Implementation - might be better to move all the functions to a utils file
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

const dates = getDates(now);

const diningHalls: String[] = ["Lulu", "Bates", "Stone D", "Tower"];

// const currentMeal = getCurrentMeal();
const currentMeal = "dinner" // FOR NOW FOR TESTING
const menus = [];

for (const dhall of diningHalls) {
    const {data: menu} = await getMenuByDateLocMeal(today, dhall, currentMeal);
    menus.push([dhall, menu.value]);

}

</script>

<template>
    <Navbar class="block md:hidden" />
    <NuxtLink to="/" class="title-container">
        <img src="~/assets/images/logo.png" alt="Wellesley Refresh Logo" class="logo">
    </NuxtLink>
    <h2>Today's {{ currentMeal }} Menu</h2>
    <HeroComponent class="hidden md:block"/>
    <MenuListComponent :menus="menus" />
    <FooterComponent />
</template>

<style scoped>
.title-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    border-bottom: 3px solid #000;
    border-bottom-style: dashed;
}

.logo {
    width: 200px;
    height: auto;
}
</style>