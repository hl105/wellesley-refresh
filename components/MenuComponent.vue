<script setup lang="ts">
const props = defineProps(["dhall", "dhallMenu"])
</script>

<template>
    <div class="menu-container">
        <h1 class="menu-title"> {{ props.dhall }}</h1>
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
    border: 3px solid #687350;
    position: relative;
}

.menu-title {
    position: absolute;
    background-color: #fff2e2;
    padding: 3px 10px;
    border-radius: 20px;
    border: 3px solid #687350;
    top: -20px;
    left: 5px;
}
</style>