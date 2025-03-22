<script setup lang="ts">
const { data: menu, error } = await getMenusByDate(now);

const menus = computed(() => menu.value)
// console.log("menus", menus.value);
// console.log("menus", menus.value ? Object.keys(menus.value) : []);
const showPopupDisclaimer = ref(false);
onMounted(() => {
  if (!localStorage.getItem('popupShown')) { // if popup hasn't been shown yet
      showPopupDisclaimer.value = true;
      localStorage.setItem('popupShown', 'true');
    }
})
</script>

<template>
  <PopupDisclaimer v-if="showPopupDisclaimer" @close="showPopupDisclaimer = false" />
  <NuxtLink to="/" class="title-container">
    <img src="~/assets/images/logo.png" alt="Wellesley Refresh Logo" class="logo">
  </NuxtLink>
  <div v-if="menus">
    <Navbar class="block md:hidden" :dates="Object.keys(menus).sort()" />
    <SelectDateButtonList :dates="Object.keys(menus).sort()" />
    <MoreOptions />
    <div class="main-elements">
      <MenuView :menus="menus"" />
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