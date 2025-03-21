<script setup lang="ts">
defineProps({menus: Object})

</script>

<template>
    <div v-for="(meals, date) in menus" :key="date">
        <h1 class="title" :id="date">
      <MenuDateButton :date="date" />
    </h1>
        <MenuSubDisplay :date="date" :meals="meals" />
</div>
</template>


<style scoped>
.title {
  font-size: 1.5em;
}
</style>
