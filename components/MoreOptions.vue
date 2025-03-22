<script setup lang="ts">
import { toggled, useToggle } from '@/composables/useToggle';
const { toggle } = useToggle();
const showPopupCaption = ref(false);
</script>

<template>
    <div class="more-options">
        <div class="text-container">
            <h2 v-if="toggled">Hide</h2>
            <h2 v-else>Show</h2>
            <button class="caption-button" @click="showPopupCaption = true"> Allergens & Preferences</button>
            <p>:</p>
            <label class="toggle-b">
                <input type="checkbox" class="appearance-none peer" @change="toggle"/>
                <span class="w-12 h-7 flex items-center flex-shrink-0 ml-3 mb-5 p-1  bg-[#687350]  rounded-full after:w-5 after:h-5 after:bg-white  after:rounded-full after:shadow-md peer-checked:bg-[#F3A203] duration-300 ease-in-out after:duration-300 peer-checked:after:translate-x-5"></span>
            </label>
            
        </div>
        <PopupCaption v-if="showPopupCaption" @close="showPopupCaption = false" />
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

.caption-button {
    text-decoration: underline;
    color: #687350;
    cursor: pointer;
    transition-duration: 0.3s;
    display: block;
}

.text-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
}

.toggle-b {
    cursor: pointer;
}

h2 {
    color: #687350;
}
</style>