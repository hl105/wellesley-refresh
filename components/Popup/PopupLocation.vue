<script setup>
import { ref } from 'vue'
const emit = defineEmits(['close'])

const { selectedDiningHalls, setSelectedLocations } = useLocationFilter()

const selectedHalls = ref(selectedDiningHalls.value)

const handleClose = () => {
  setSelectedLocations(selectedHalls.value)
  emit('close')
}
</script>

<template>
    <div class="popup-overlay">
        <div class="popup-content">
            <button class="close-button" @click="handleClose">X</button>
            <h2>Dining Halls</h2>
            <div class="dining-hall-container">
                <label class="dining-hall-item" :class="{'selected-hall': selectedHalls.includes('Bates')}">
                  <input type="checkbox" value="Bates" v-model="selectedHalls" />
                  Bates
                </label>
                <label class="dining-hall-item" :class="{'selected-hall': selectedHalls.includes('Stone D')}">
                  <input type="checkbox" value="Stone D" v-model="selectedHalls" />
                  Stone D
                </label>
                <label class="dining-hall-item" :class="{'selected-hall': selectedHalls.includes('Lulu')}">
                  <input type="checkbox" value="Lulu" v-model="selectedHalls" />
                  Lulu
                </label>
                <label class="dining-hall-item" :class="{'selected-hall': selectedHalls.includes('Tower')}">
                  <input type="checkbox" value="Tower" v-model="selectedHalls" />
                  Tower
                </label>
            </div>
            <div class="selected-halls-line">
              Selected: {{ selectedHalls.join(', ') }}
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

.dining-hall-item {
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

.dining-hall-item.selected-hall {
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