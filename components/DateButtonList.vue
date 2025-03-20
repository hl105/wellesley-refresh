<script setup>
import { ref } from 'vue'

const props = defineProps(["dates"])
const emit = defineEmits(['dateSelected'])

const clickedDate = ref(null)

const selectDate = (date) => {
    clickedDate.value = date
    emit('dateSelected', date)
}
</script>

<template>
    <div class="date-button-list">
        <DateButton 
            v-for="date in props.dates" 
            :key="date" 
            :date="date"
            @click="selectDate(date)"
            :class="{ active: clickedDate === date }"
        />
    </div>
</template>

<style scoped>
.date-button-list {
    display: flex;
    flex-direction: row;
    gap: 10px;
}
</style>