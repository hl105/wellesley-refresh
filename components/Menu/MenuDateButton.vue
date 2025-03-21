<script setup>
const props = defineProps(["date"])
const today = new Date().toISOString().split('T')[0];

const date = props.date === today ? "TODAY" : formatDate(props.date);
const backgroundC = props.date === today ? "#F3A203" : "#687350";

</script>

<template>
    <button :style="{ backgroundColor: `${backgroundC}`}">{{ date }}</button>
</template>

<style scoped>
button {
    padding: 5px 10px;
    margin-right: 3px;
    border-radius: 25px;
    color: #fff2e2;
    transition-duration: 0.3s;
    font-weight: bolder;
    font-size: 1.3em;
}
</style>