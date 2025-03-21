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
    <div class="hero-section">
        <h2>Jump to...</h2>
        <div class="date-button-list">
            <SelectDateButton 
                v-for="date in props.dates" 
                :key="date" 
                :date="date"
                @click="selectDate(date)"
                :class="{ active: clickedDate === date }"
                :color="'#687350'"
            />
        </div>
    </div>
</template>

<style scoped>
.date-button-list {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
}

.hero-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background: #fff2e2;
    padding: 1rem;
    color: #687350;
}
</style>