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

const toggleNavbar = () => {
    isNavbarVisible.value = !isNavbarVisible.value;
}

</script>


<template>
    <div class="navbar-container">
        <div class="hamburger" @click="toggleNavbar">☰</div>
        <aside class="Navbar" v-if="isNavbarVisible">
            <div class="close-button" @click="toggleNavbar">X</div>
            <div class="date-selector">
                <h2> Nav Select Date</h2>
            </div>
        </aside>
    </div>
</template>

<style scoped>
.hamburger {
  position: fixed;
  top: 1rem;
  left: 1rem;
  font-size: 2rem;
  cursor: pointer;
  z-index: 100;
}

.Navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background: #01291B;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  z-index: 99;
  padding: 4rem 1rem 1rem;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  color: black;
}
</style>