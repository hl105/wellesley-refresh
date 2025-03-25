<script setup>
const emit = defineEmits(['close'])
import { ALLERGENS, PREFERENCES } from '@/constants'


</script>

<template>
    <div class="popup-overlay">
        <div class="popup-content">
            <button class="close-button" @click="emit('close')">X</button>
            <h2 class="captions-text">Allergens and Preferences</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 ">
                <div class="caption-item ">
                    <h3>Allergens</h3>
                    <div class="allergen-container">
                        <div class="allergen-item" v-for="allergen in ALLERGENS" :key="allergen.id">
                            <img :src="allergen.img" alt="Allergen Image" />
                            <p>{{ allergen.name }}</p>
                        </div>
                    </div>
                </div>
                <div class="caption-item">
                    <h3>Preferences</h3>
                    <div class="preferences-container">
                        <div class="preference-item" v-for="preference in PREFERENCES" :key="preference.id">
                            <img :src="preference.img" alt="Preference Image" />
                            <p>{{ preference.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
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
    align-items: left;
    justify-content: center;
    gap: 0.8em;
    background-color: #fff2e2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1em;
    padding: 1em;
    border-width: 3px;
    border-color: black;
    padding-top: 2em;
}

.close-button {
    font-family: 'DynaPuff';
    background-color: #fff2e2;
    border-radius: 1em;
    padding: 2px;
    padding-left: 10px;
    padding-right: 10px;
    position: absolute; top: 8px; right: 8px;
}

.close-button:hover {
    background-color: #D3D3D3;
}


.allergen-container, .preferences-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 3px;
}

.allergen-item, .preference-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    gap: 1em;
}

.caption-item {
    display: flex;
    flex-direction: column;
    justify-content: top;
    gap: 0.5em;
}

p {
    font-size: 11px;
}

img {
    width: 1em;
    height: 1em;
}
</style>