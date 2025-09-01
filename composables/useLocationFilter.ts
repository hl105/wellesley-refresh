const selectedDiningHalls = ref<string[]>([]);
const isInitialized = ref(false);

export const useLocationFilter = () => {
  const initializeFromStorage = () => {
    if (import.meta.client && !isInitialized.value) {
      const savedState = localStorage.getItem("selectedDiningHalls");
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          const selected = [];
          if (parsed.bates !== false) selected.push("Bates");
          if (parsed.stoneDavis !== false) selected.push("Stone D");
          if (parsed.lulu !== false) selected.push("Lulu");
          if (parsed.tower !== false) selected.push("Tower");
          selectedDiningHalls.value = selected;
        } catch (e) {
          console.error("Error parsing saved dining hall state:", e);
          selectedDiningHalls.value = ["Bates", "Stone D", "Lulu", "Tower"];
        }
      } else {
        selectedDiningHalls.value = ["Bates", "Stone D", "Lulu", "Tower"];
      }
      isInitialized.value = true;
    }
  };

  const setSelectedLocations = (locations: string[]) => {
    selectedDiningHalls.value = locations;

    if (import.meta.client) {
      const state = {
        bates: locations.includes("Bates"),
        stoneDavis: locations.includes("Stone D"),
        lulu: locations.includes("Lulu"),
        tower: locations.includes("Tower"),
      };
      localStorage.setItem("selectedDiningHalls", JSON.stringify(state));
    }

    updateColumnSizes();
    hideFilteredLocations();
  };

  const getSelectedLocations = () => {
    return selectedDiningHalls.value;
  };

  const hideFilteredLocations = () => {
    const root = document.documentElement;
    for (const dhall of ["Bates", "Stone D", "Lulu", "Tower"]) {
      let lowerDhall = dhall.toLowerCase().replace(' ', '');
      root.style.setProperty("--display-" + lowerDhall, selectedDiningHalls.value.includes(dhall) ? "block" : "none");
    }
  }

  const updateColumnSizes = () => {
    const root = document.documentElement;
    root.style.setProperty("--lg-num-cols", `repeat(${selectedDiningHalls.value.length}, minmax(0, 1fr))`);
    root.style.setProperty("--sm-num-cols", `repeat(${Math.floor(selectedDiningHalls.value.length / 2)}, minmax(0, 1fr))`);
  }

  initializeFromStorage();

  return {
    selectedDiningHalls,
    setSelectedLocations,
    getSelectedLocations,
    hideFilteredLocations,
    updateColumnSizes,
    initializeFromStorage,
    isInitialized,
  };
};
