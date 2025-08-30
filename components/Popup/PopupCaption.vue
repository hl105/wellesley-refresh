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