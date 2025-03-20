<script setup lang="ts">
const props = defineProps(["dhall", "dhallMenu"])
</script>

<template>
    <div class="menu-container">
        <h1> {{ props.dhall }}</h1>
        <div v-if="props.dhallMenu.length === 0">
            No menu found
        </div>
        <ul v-else>
            <li v-for="item in props.dhallMenu" :key="item.id">{{ item.name }}</li>
        </ul>
    </div>
</template>

<style scoped>
.menu-container {
    padding: 1em;
    border-radius: 10px;
    border: 3px solid #000;
}
</style>