<script setup>
const props = defineProps(["dates"])
const emits = defineEmits(["dateSelected"])
</script>

<template>
    <div class="hero-section">
        <div class="date-selector">
            <h2>Jump to...</h2>
            <DateButtonList :dates="props.dates" @dateSelected="emits('dateSelected', $event)" />
        </div>
    </div>
</template>

<style scoped>
.hero-section {
    background: #fff2e2;
    padding: 1rem;
    text-align: center;
    font-family: "DynaPuff", sans-serif;
    color: #687350;
}

</style> 