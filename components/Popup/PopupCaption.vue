<script setup lang="ts">
const emit = defineEmits(['close'])
import { ALLERGENS, PREFERENCES } from '@/constants'
import { useToggle, toggled } from '@/composables/useToggle';
import { useAllergenPreferenceFilter } from '@/composables/useAllergenPreferenceFilter';

const { toggle } = useToggle();
const { 
  includedPreferences,
  excludedAllergens,
  preferenceMode,
  includeNoPreferences,
  hideUnknownAllergens,
  setIncludedPreferences,
  setExcludedAllergens,
  setPreferenceMode,
  setIncludeNoPreferences,
  setHideUnknownAllergens,
  resetToDefaults,
  getSummary
} = useAllergenPreferenceFilter();

// Watch for changes to update localStorage
watch(includedPreferences, (newValue) => {
  setIncludedPreferences(newValue);
}, { deep: true });

watch(excludedAllergens, (newValue) => {
  setExcludedAllergens(newValue);
}, { deep: true });

const togglePreference = (key: string) => {
  const current = [...includedPreferences.value];
  const index = current.indexOf(key);
  if (index === -1) {
    current.push(key);
  } else {
    current.splice(index, 1);
  }
  setIncludedPreferences(current);
};

const toggleAllergen = (key: string) => {
  const current = [...excludedAllergens.value];
  const index = current.indexOf(key);
  if (index === -1) {
    current.push(key);
  } else {
    current.splice(index, 1);
  }
  setExcludedAllergens(current);
};

const summary = computed(() => getSummary());
</script>

<template>
    <div class="popup-overlay" @click="emit('close')">
        <div class="popup-content" @click.stop>
            <button class="close-button" @click="emit('close')">X</button>
            
            <!-- Header with summary -->
            <div class="header-section">
                <h2>Filter Menu Items</h2>
                <div class="display-toggle-container">
                    <span class="toggle-label">Display icons on menu</span>
                    <label class="toggle-switch">
                        <input type="checkbox" @change="toggle" :checked="toggled"/>
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="summary-line" v-if="summary">
                    {{ summary }}
                </div>
                <button @click="resetToDefaults" class="reset-button">
                    Reset to default
                </button>
            </div>

            <!-- Preferences Section -->
            <div class="filter-section">
                <div class="section-header">
                    <h3>Include dishes that are:</h3>
                    <div class="mode-toggle">
                        <span class="mode-label">Mode:</span>
                        <button 
                            :class="{ active: preferenceMode === 'OR' }" 
                            @click="setPreferenceMode('OR')"
                            class="mode-btn"
                        >
                            OR
                        </button>
                        <button 
                            :class="{ active: preferenceMode === 'AND' }" 
                            @click="setPreferenceMode('AND')"
                            class="mode-btn"
                        >
                            AND
                        </button>
                    </div>
                </div>
                
                <div class="filter-grid">
                    <button 
                        v-for="(preference, key) in PREFERENCES" 
                        :key="preference.id" 
                        :class="{ selected: includedPreferences.includes(key) }"
                        @click="togglePreference(key)"
                        class="filter-chip"
                    >
                        <img :src="preference.img" :alt="preference.name" />
                        <span>{{ preference.name }}</span>
                    </button>
                </div>
                
                <div class="mini-switch">
                    <label class="mini-switch-container">
                        <input 
                            type="checkbox" 
                            v-model="includeNoPreferences"
                            @change="setIncludeNoPreferences(includeNoPreferences)"
                        />
                        <span class="mini-switch-slider"></span>
                        <span class="mini-switch-label">Include dishes with no preference tags</span>
                    </label>
                </div>
            </div>

            <!-- Allergens Section -->
            <div class="filter-section">
                <div class="section-header">
                    <h3>Exclude dishes containing:</h3>
                </div>
                
                <div class="filter-grid">
                    <button 
                        v-for="(allergen, key) in ALLERGENS" 
                        :key="allergen.id" 
                        :class="{ selected: excludedAllergens.includes(key) }"
                        @click="toggleAllergen(key)"
                        class="filter-chip"
                    >
                        <img :src="allergen.img" :alt="allergen.name" />
                        <span>{{ allergen.name }}</span>
                    </button>
                </div>
                
                <div class="mini-switch">
                    <label class="mini-switch-container">
                        <input 
                            type="checkbox" 
                            v-model="hideUnknownAllergens"
                            @change="setHideUnknownAllergens(hideUnknownAllergens)"
                        />
                        <span class="mini-switch-slider"></span>
                        <span class="mini-switch-label">Exclude dishes with no allergen tags</span>
                    </label>
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
    background-color: #fff2e2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1em;
    padding: 2em 1.5em 1.5em;
    border: 3px solid black;
    width: 600px;
    max-width: 90vw;
    max-height: 80vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    box-sizing: border-box;
}

.close-button {
    font-family: 'DynaPuff';
    background-color: #fff2e2;
    border-radius: 1em;
    padding: 5px 12px;
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
}

.close-button:hover {
    background-color: #D3D3D3;
}

.header-section {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    border-bottom: 2px dotted #687350;
    padding-bottom: 0.6em;
    padding-top: 0.2em;
}

.header-section h2 {
    margin: 0;
    color: #687350;
    font-size: 1.5em;
}

.display-toggle-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-width: 200px;
}

.toggle-label {
    font-weight: 500;
    color: #687350;
}

.toggle-switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
    cursor: pointer;
    flex-shrink: 0;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #687350;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    top: 3px;
    background-color: white;
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.toggle-switch input:checked + .slider {
    background-color: #F3A203;
}

.toggle-switch input:checked + .slider:before {
    transform: translateX(24px);
}

/* Summary line */
.summary-line {
    background-color: rgba(104, 115, 80, 0.1);
    padding: 0.8em 1em;
    border-radius: 0.5em;
    font-size: 0.9em;
    color: #687350;
    font-weight: 500;
    margin-top: 1em;
    border: 1px solid rgba(104, 115, 80, 0.2);
}

/* Reset button */
.reset-button {
    margin-top: 0.8em;
    padding: 0.5em 1em;
    background: transparent;
    color: #666;
    border: 1px solid #ddd;
    border-radius: 0.4em;
    font-size: 0.8em;
    cursor: pointer;
    transition: all 0.2s;
    align-self: flex-start;
}

.reset-button:hover {
    background: #f5f5f5;
    border-color: #687350;
    color: #687350;
}

/* Section styles */
.filter-section {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5em;
}

.section-header h3 {
    margin: 0;
    color: #687350;
    font-size: 1.2em;
    font-weight: 600;
}

/* Mode toggle */
.mode-toggle {
    display: flex;
    align-items: center;
    gap: 0.3em;
}

.mode-label {
    font-size: 0.85em;
    color: #666;
    font-weight: 500;
}

.mode-btn {
    padding: 0.2em 0.6em;
    border: 1px solid #687350;
    background: white;
    color: #687350;
    border-radius: 0.3em;
    font-size: 0.75em;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.mode-btn.active,
.mode-btn:hover {
    background: #687350;
    color: white;
}

/* Filter chips grid */
.filter-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
}

/* Filter chip buttons */
.filter-chip {
    display: flex;
    align-items: center;
    gap: 0.4em;
    padding: 0.5em 0.8em;
    border: 2px solid #ddd;
    background: white;
    border-radius: 2em;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.85em;
    font-weight: 500;
}

.filter-chip:hover {
    border-color: #687350;
    background: rgba(104, 115, 80, 0.05);
}

.filter-chip.selected {
    border-color: #687350;
    background: #687350;
    color: white;
}

.filter-chip img {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
}

.filter-chip span {
    white-space: nowrap;
}

/* Mini switches */
.mini-switch {
    margin-top: 0.5em;
}

.mini-switch-container {
    display: flex;
    align-items: center;
    gap: 0.5em;
    cursor: pointer;
    font-size: 0.85em;
}

.mini-switch-container input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #687350;
    margin: 0;
}

.mini-switch-label {
    color: #666;
    font-weight: 500;
}

.subtitle-note {
  font-size: 0.8em;
  color: #555;
}

/* Responsive adjustments */
@media (max-width: 640px) {
    .popup-content {
        max-width: 95vw;
        padding: 2em 1em 1em;
    }
    
    .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.8em;
    }
    
    .mode-toggle {
        align-self: flex-end;
    }
    
    .filter-grid {
        gap: 0.4em;
    }
    
    .filter-chip {
        font-size: 0.8em;
        padding: 0.4em 0.6em;
    }
    
    .summary-line {
        font-size: 0.8em;
        padding: 0.6em 0.8em;
    }
}
</style>