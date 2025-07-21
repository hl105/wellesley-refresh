<script setup lang="ts">
const props = defineProps({
    meals: Object,
    date: String
});

// console.log(props.meals)
// console.log(props.date)
// console.log(props.date, today, (props.date === today))
const date = (props.date === getToday()) ? "Today" : ((props.date === getTomorrow()) ? "Tomorrow" : formatDate(props.date));
const sortedMeals = ["breakfast", "lunch", "brunch", "dinner"];

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
</script>

<template>
    <div v-if="props.meals">
        <div style="text-align: left; padding-bottom: 5px;">
            <a :href="`#${props.date}`" class="date">{{ date }}</a>
            <div v-for="meal in sortedMeals">
                <div v-if="props.meals[meal]">
                    <a :href="`#${props.date}-${meal}`" style="font-family: Work Sans, sans-serif; margin-left: 10px; text-decoration: underline;">{{ capitalize(meal) }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
a {
    /* border: 3px solid;
    padding: 5px 10px;
    border-radius: 20px; */
    cursor: pointer;
    transition-duration: 0.3s;
    display: block;
    font-size: 0.8em;
    color: #fff2e2;
}
</style>