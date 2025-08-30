<script setup>
const emit = defineEmits(['close'])
</script>

<template>
    <div class="popup-overlay">
        <div class="popup-content">
            <h2 class="disclaimer-text">Disclaimer</h2>
            <p class="disclaimer-text">This menu has the <em>same</em> information as on the Wellesley Fresh website, just presented in a nicer format. If the menu is incorrect here, it is because it is also incorrect there!</p>
            <button class="close-button" @click="emit('close')">close</button>
        </div>
    </div>
</template>

<style scoped>
.disclaimer-text {
    text-align: center;
    color: white;
}   
</style>