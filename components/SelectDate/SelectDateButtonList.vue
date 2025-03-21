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

        <div class="date-button-list">
            <h2 class="jump">Jump to...</h2>
            <SelectDateButton v-for="date in props.dates" :key="date" :date="date" @click="selectDate(date)"
                :class="{ active: clickedDate === date }" :color="'#687350'" />
        </div>
    </div>
</template>

<style scoped>
.date-button-list {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
}

.hero-section {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background: #fff2e2;
    padding: 1rem;
    color: #687350;
    position: sticky;
    top: 0;
    z-index: 10;
}

@media screen and (min-width: 770px) {
    .hero-section {
        display: flex;
    }
}
</style>