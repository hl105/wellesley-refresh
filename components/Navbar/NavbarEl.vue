<script setup lang="ts">
import type { PrettifiedData } from "~/types";
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  menus: PrettifiedData
}>();

const sortedDates = computed(() => { // sort dates by time
  return Object.keys(props.menus).sort((a: string, b: string) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });
});

const isNavbarVisible = ref(false);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  if (isNavbarVisible.value) {
    isNavbarVisible.value = false;
    hamburger_display = "flex"
  }
}

let hamburger_display = "flex"

const toggleNavbar = () => {
  isNavbarVisible.value = !isNavbarVisible.value;
  hamburger_display = isNavbarVisible.value ? "none" : "flex"
}

</script>


<template>
  <div class="navbar-container">
    <div class="hamburger" @click="toggleNavbar" :style="{ display: `${hamburger_display}` }">
      <p>☰</p>
    </div>
    <aside class="Navbar" v-if="isNavbarVisible" @click="toggleNavbar">
      <div class="close-button">
        <p>X</p>
      </div>
      <div class="date-selector">
        <h2> Jump to...</h2>
        <br />
        <div class="date-button-list">
          <NavbarDate v-for="date in sortedDates" :meals="menus[date]" :date="date" :color="'#fff2e2'" />
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.hamburger {
  position: fixed;
  bottom: 1rem;
  right: 1.5rem;
  width: 2.5rem;
  height: 2.5rem;
  padding-bottom: 4px;
  cursor: pointer;
  z-index: 100;
  background-color: #687350;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 3px dotted #fff2e2; */
  color: #fff2e2;
}

.hamburger p {
  font-size: 1.5rem;
  position: relative;
  /* margin-top: 5px; */
}

.Navbar {
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  background: #687350;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 99;
  padding: 3rem 2rem;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  z-index: 100;
  background-color: #fff2e2;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px dotted #687350;
}

.close-button p {
  font-size: 1.2em;
  font-family: 'DynaPuff';
}

h2 {
  color: #fff2e2;
}

.date-button-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  font-family: 'DynaPuff';
}
</style>