<script setup>
function formatDayOfWeek(dayOfWeek) {
    switch (dayOfWeek) {
    	case 0: return "Sunday"; break;
        case 1: return "Monday"; break;
        case 2: return "Tuesday"; break;
        case 3: return "Wednesday"; break;
        case 4: return "Thursday"; break;
        case 5: return "Friday"; break;
        case 6: return "Saturday"; break;
    }
}

function formatMonth(month) {
	switch (month) {
    	case 0: return "Jan"; break;
        case 1: return "Feb"; break;
        case 2: return "Mar"; break;
        case 3: return "Apr"; break;
        case 4: return "May"; break;
        case 5: return "Jun"; break;
        case 6: return "Jul"; break;
        case 7: return "Aug"; break;
        case 8: return "Sep"; break;
        case 9: return "Oct"; break;
        case 10: return "Nov"; break;
        case 11: return "Dec"; break;
    }
}

function formatDate(date) {
	return `${formatDayOfWeek(date.getDay())}, ${formatMonth(date.getMonth())}. ${date.getDate()}`;
}

const props = defineProps(["date", "color"])
const today = new Date().toISOString().split('T')[0];

const date = props.date === today ? "Today" : formatDate(new Date(props.date));
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