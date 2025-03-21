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

const props = defineProps(["date"])
const today = new Date().toISOString().split('T')[0];

// function formatDate(dateString) {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
// }

const date = props.date === today ? "TODAY" : formatDate(new Date(props.date));
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