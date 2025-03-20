<script setup lang="ts">

// TODO: DATE Implementation - might be better to move all the functions to a utils file
const now: Date = new Date();
const today: Date = now.toISOString().split('T')[0];

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
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
        <img src="~/assets/images/logo.svg" alt="Wellesley Refresh Logo" class="logo">
    </NuxtLink>
    <div class="main-elements">
      <HeroComponent class="hidden md:block"/>
    
    <h1 class="title"><ShowDateButton date="2025-03-20"/>{{ capitalize(currentMeal) }}</h1 class="title">
    <MenuListComponent :menus="menus" />
    </div>
    <FooterComponent />
</template>

<style scoped>

.title {
  font-size: 1.5em;
}
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