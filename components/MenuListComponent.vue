<script setup lang="ts">
defineProps({
  menus: Object
});

</script>

<template>
    <div class="menu-grid" v-for="(items, dhall) in menus" :key="dhall">
        <MenuComponent :dhall=dhall :dhallMenu=items />
    </div>
</template>

<style scoped>
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5em;
  margin: 2em auto;
  max-width: 1200px;
}
</style>