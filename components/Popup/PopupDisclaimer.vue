<script setup>
const emit = defineEmits(['close'])
</script>

<template>
    <div class="popup-overlay">
        <div class="popup-content">
            <h2 class="disclaimer-text">Disclaimer</h2>
            <p class="disclaimer-text">This menu has the <em>same</em> information as on the Wellesley Fresh website, just presented in a nicer format. If the menu is incorrect here, it is because it is also incorrect there!</p>
            <button class="close-button"  @click="(event) => { event.stopPropagation(); emit('close'); }">close</button>
        </div>
    </div>
</template>

<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(255, 255, 255, 0.8);
}

.popup-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.8em;
    background-color: #01291B;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1em;
    padding: 1em;
    border-width: 5px;
    border-color: black;
}

.close-button {
    background-color: #fff2e2;
    border-radius: 1em;
    padding: 2px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-width: 4px;
    border-color: black;
}

.close-button:hover {
    background-color: #D3D3D3;
}

.disclaimer-text {
    text-align: center;
    color: white;
}   
</style>