<script setup lang="ts">
const showPopupCaption = ref(false);
const showPopupLocation = ref(false);

</script>

<template>
    <div class="more-options">
        <div class="text-container">
            <h2>Filter By:</h2>
            <div class="preference-allergen-container">
                <button class="caption-button" @click="showPopupCaption = true"> Allergens & Preferences</button>
            </div>
            <p>|</p>
            <div class="location-container">
                <button class="location-button" @click="showPopupLocation = true"> Locations</button>
            </div>
        </div>
        <PopupCaption v-if="showPopupCaption" @close="showPopupCaption = false" />
        <PopupLocation v-if="showPopupLocation" @close="showPopupLocation = false" />
    </div>
</template>

<style scoped>
.more-options {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-bottom: 3px dotted #687350;
}

.preference-allergen-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
}

.location-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
}

.caption-button {
    text-decoration: underline;
    color: #687350;
    cursor: pointer;
    display: block;
    font-family: 'DynaPuff';
}

.text-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    padding-top: 1em;
    padding-bottom: 1em;
}

h2 {
    color: #687350;
}

.location-button {
    text-decoration: underline;
    color: #687350;
    cursor: pointer;
    font-family: 'DynaPuff';
}
</style>