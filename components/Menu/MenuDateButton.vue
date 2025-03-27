<script setup>
const props = defineProps(["date"])

const date = (props.date === today) ? "Today" : ((props.date === tomorrow) ? "Tomorrow" : formatDate(props.date));
const backgroundC = (props.date === today) ? "#F3A203" : "#687350";
</script>

<template>
    <div class="dateheader">
        <button :style="{ backgroundColor: `${backgroundC}`}">{{ date }}</button>
    </div>
</template>

<style scoped>
.dateheader {
    display: grid;
    place-items: center;
}
button {
    padding: 5px 10px;
    margin-right: 3px;
    border-radius: 25px;
    color: #fff2e2;
    transition-duration: 0.3s;
    font-weight: bolder;
    font-size: 1.6em;
}
</style>