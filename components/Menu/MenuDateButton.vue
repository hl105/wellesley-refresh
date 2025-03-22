<script setup>
const props = defineProps(["date"])
const today = new Date();
const tomorrow = new Date(today.getTime() + 86400000); // adds 1 day in ms


const date = new Date(props.date);
const displayDate = (date.getTime() === today.getTime()) ? "TODAY" : ((date.getTime() === tomorrow.getTime()) ? "TOMORROW" : formatDate(props.date));
const backgroundC = (displayDate === "TODAY") ? "#F3A203" : "#687350";
</script>

<template>
    <button :style="{ backgroundColor: `${backgroundC}`}">{{ displayDate }}</button>
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