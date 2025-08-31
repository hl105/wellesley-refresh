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
  };

  const getSelectedLocations = () => {
    return selectedDiningHalls.value;
  };

  const filterMenuByLocations = (menuData: any) => {
    if (!menuData) return menuData;

    const filteredData: any = {};

    // Iterate through dates
    Object.keys(menuData).forEach((date) => {
      filteredData[date] = {};

      // Iterate through meals (breakfast, lunch, dinner, brunch)
      Object.keys(menuData[date]).forEach((meal) => {
        filteredData[date][meal] = {};

        // Filter dining halls based on selected locations
        Object.keys(menuData[date][meal]).forEach((dhall) => {
          if (selectedDiningHalls.value.includes(dhall)) {
            filteredData[date][meal][dhall] = menuData[date][meal][dhall];
          }
        });
      });
    });

    return filteredData;
  };

  initializeFromStorage();

  return {
    selectedDiningHalls,
    setSelectedLocations,
    getSelectedLocations,
    filterMenuByLocations,
    initializeFromStorage,
    isInitialized: isInitialized,
  };
};
