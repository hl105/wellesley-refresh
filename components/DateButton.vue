<script setup>
const props = defineProps(["date"])
</script>

<template>
    <button>{{ props.date }}</button>
</template>

<style scoped>
button {
    border: 3px solid #333;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
}

button:hover {
    background-color: #333;
}

button:active {
  background-color: #242424;
}

</style>