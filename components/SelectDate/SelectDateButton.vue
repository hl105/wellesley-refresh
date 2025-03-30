<script setup>
const props = defineProps(["date", "color"])
// console.log(props.date, today, (props.date === today))
const date = (props.date === getToday()) ? "Today" : ((props.date === getTomorrow()) ? "Tomorrow" : formatDate(props.date));
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
    display: block;
    font-size: 0.8em;
}

a:hover {
    background-color: #687350;
    color: #fff2e2 !important;
}

a:active {
  background-color: #687350;
}

a {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>