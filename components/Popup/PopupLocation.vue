<script setup>
import { ref } from 'vue'
const emit = defineEmits(['close'])

const { selectedDiningHalls, setSelectedLocations } = useLocationFilter()

const selectedHalls = ref(selectedDiningHalls.value)

const delay = ms => new Promise(res => setTimeout(res, ms));
async function dynamicUpdate() {
  await delay(1);
  setSelectedLocations(selectedHalls.value);
}
</script>

<template>
    <div class="popup-overlay" @click="emit('close')">
        <div class="popup-content" @click.stop>
            <button class="close-button" @click="emit('close')">X</button>
            <h2>Dining Halls</h2>
            <div class="dining-hall-container">
                <input type="checkbox" id="bates" value="Bates" v-model="selectedHalls" @click="dynamicUpdate"/>
                <label for="bates" :class="{'selected-hall': selectedHalls.includes('Bates')}">Bates</label>

                <input type="checkbox" id="stoned" value="Stone D" v-model="selectedHalls" @click="dynamicUpdate" />
                <label for="stoned" :class="{'selected-hall': selectedHalls.includes('Stone D')}">Stone D</label>

                <input type="checkbox" id="lulu" value="Lulu" v-model="selectedHalls" @click="dynamicUpdate" />
                <label for="lulu" :class="{'selected-hall': selectedHalls.includes('Lulu')}">Lulu</label>

                <input type="checkbox" id="tower" value="Tower" v-model="selectedHalls" @click="dynamicUpdate"/>
                <label for="tower" :class="{'selected-hall': selectedHalls.includes('Tower')}">Tower</label>
            </div>
            <div class="selected-halls-line">
              Selected: {{ selectedHalls.join(', ') }}
            </div>
        </div>
    </div>
</template>

<style scoped>
input {
  display: none;
}

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

label {
  margin: 0.3em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
  background-color: transparent;
  color: black;
  font-size: 1em;
  white-space: nowrap;
}

label.selected-hall {
  background-color: #687350;
  color: white;
}

.selected-halls-line {
  font-weight: bold;
}

.dining-hall-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
}

.dining-hall-item input[type="checkbox"] {
  display: none; /* hide default checkbox */
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .dining-hall-container {
    gap: 0.3em;
  }
  
  .dining-hall-item {
    font-size: 0.9em;
    padding: 0.4em 0.8em;
    margin: 0.2em;
  }
}
</style>