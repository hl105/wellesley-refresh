<script setup>
const props = defineProps(["date", "color"])
const today = new Date().toISOString().split('T')[0];

const date = props.date === today ? "Today" : props.date.slice(5);
</script>

<template>
    <a :style="{ color: `${props.color}`, borderColor: `${props.color}`}" :href="`#${props.date}`">{{ date }}</a>
</template>

<style scoped>
a {
    border: 3px solid;
    padding: 5px 10px;
    border-radius: 20px;
    cursor: pointer;
    transition-duration: 0.3s;
    font-family: "DynaPuff", sans-serif;
    display: block;
}

a:hover {
    background-color: #687350;
    color: #fff2e2 !important;
}

a:active {
  background-color: #687350;
}

</style>