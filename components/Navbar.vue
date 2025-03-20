<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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
    }
}

let hamburger_display= "flex"

const toggleNavbar = () => {
    isNavbarVisible.value = !isNavbarVisible.value;
    hamburger_display = isNavbarVisible.value ? "none" : "flex"
}


</script>


<template>
    <div class="navbar-container">
        <div class="hamburger" @click="toggleNavbar" :style="{ display: `${hamburger_display}`}"><p>☰</p></div>
        <aside class="Navbar" v-if="isNavbarVisible">
            <div class="close-button" @click="toggleNavbar"><p>X</p></div>
            <div class="date-selector">
                <h2> Jump to...</h2>
            </div>
        </aside>
    </div>
</template>

<style scoped>
.hamburger {
  position: fixed;
  top: 2rem;
  left: 1rem;
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

.hamburger p {
  font-size: 1.5rem;
  position: relative;
}

.Navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background: #687350;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  z-index: 99;
  padding: 4rem 1rem 1rem;
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
}

h2 {
  color: #fff2e2;
}
</style>