<script setup lang="ts">
const props = defineProps(["menus"])
</script>

<template>
    <div class="menu-grid">
      <div v-for="menu in props.menus" :key="menu.id">
        <MenuComponent :dhall="menu[0]" :dhallMenu="menu[1]"/>
      </div>
    </div>
</template>

<style scoped>
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5em;
  margin: 2em auto;
  padding: 1em;
  max-width: 1200px;
}
</style>