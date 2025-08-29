import { ALLERGENS, PREFERENCES } from "@/constants";

const getInitialSelections = () => {
  if (import.meta.client) {
    const savedState = localStorage.getItem("allergenPreferenceFilters");
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        return {
          includedPreferences: parsed.includedPreferences || [],
          excludedAllergens: parsed.excludedAllergens || [],
          preferenceMode: parsed.preferenceMode || "OR",
          includeNoPreferences: parsed.includeNoPreferences !== false,
          hideUnknownAllergens: parsed.hideUnknownAllergens || false,
        };
      } catch (e) {
        console.error(
          "Error parsing saved allergen/preference filter state:",
          e
        );
      }
    }
  }
  return {
    includedPreferences: Object.keys(PREFERENCES), // Default: all preferences included
    excludedAllergens: [], // What allergens to exclude
    preferenceMode: "OR", // OR or AND logic for preferences
    includeNoPreferences: true, // Include items with no preference tags
    hideUnknownAllergens: false, // Hide items with unknown allergens
  };
};

const includedPreferences = ref<string[]>([]);
const excludedAllergens = ref<string[]>([]);
const preferenceMode = ref<"OR" | "AND">("OR");
const includeNoPreferences = ref(true);
const hideUnknownAllergens = ref(false);
const isInitialized = ref(false);

export const useAllergenPreferenceFilter = () => {
  const initializeFromStorage = () => {
    if (import.meta.client && !isInitialized.value) {
      const initial = getInitialSelections();
      includedPreferences.value = initial.includedPreferences;
      excludedAllergens.value = initial.excludedAllergens;
      preferenceMode.value = initial.preferenceMode;
      includeNoPreferences.value = initial.includeNoPreferences;
      hideUnknownAllergens.value = initial.hideUnknownAllergens;
      isInitialized.value = true;
    }
  };

  const saveToStorage = () => {
    if (import.meta.client) {
      const state = {
        includedPreferences: includedPreferences.value,
        excludedAllergens: excludedAllergens.value,
        preferenceMode: preferenceMode.value,
        includeNoPreferences: includeNoPreferences.value,
        hideUnknownAllergens: hideUnknownAllergens.value,
      };
      localStorage.setItem("allergenPreferenceFilters", JSON.stringify(state));
    }
  };

  const setIncludedPreferences = (preferences: string[]) => {
    includedPreferences.value = preferences;
    saveToStorage();
  };

  const setExcludedAllergens = (allergens: string[]) => {
    excludedAllergens.value = allergens;
    saveToStorage();
  };

  const setPreferenceMode = (mode: "OR" | "AND") => {
    preferenceMode.value = mode;
    saveToStorage();
  };

  const setIncludeNoPreferences = (include: boolean) => {
    includeNoPreferences.value = include;
    saveToStorage();
  };

  const setHideUnknownAllergens = (hide: boolean) => {
    hideUnknownAllergens.value = hide;
    saveToStorage();
  };

  const shouldShowDish = (dish: any) => {
    if (!dish) return true;

    // Check excluded allergens - hide dish if it contains any excluded allergens
    if (dish.allergens && Array.isArray(dish.allergens)) {
      for (const allergen of dish.allergens) {
        const allergenKeys = Object.keys(ALLERGENS);
        const matchingAllergenKey = allergenKeys.find(
          (key) => ALLERGENS[key as keyof typeof ALLERGENS].id === allergen.id
        );
        if (
          matchingAllergenKey &&
          excludedAllergens.value.includes(matchingAllergenKey)
        ) {
          return false; // Hide dish if it contains an excluded allergen
        }
      }
    } else if (hideUnknownAllergens.value) {
      // Dish has no allergen info and user wants to hide unknown allergens
      return false;
    }

    // Check preferences
    const dishHasPreferences =
      dish.preferences &&
      Array.isArray(dish.preferences) &&
      dish.preferences.length > 0;

    if (!dishHasPreferences) {
      // Dish has no preferences
      return includeNoPreferences.value;
    }

    if (includedPreferences.value.length === 0) {
      // No preferences selected for inclusion, but dish has preferences
      return false;
    }

    // Check if dish matches included preferences
    const dishPreferenceKeys: string[] = [];
    for (const preference of dish.preferences) {
      const preferenceKeys = Object.keys(PREFERENCES);
      const matchingPreferenceKey = preferenceKeys.find(
        (key) =>
          PREFERENCES[key as keyof typeof PREFERENCES].id === preference.id
      );
      if (matchingPreferenceKey) {
        dishPreferenceKeys.push(matchingPreferenceKey);
      }
    }

    if (preferenceMode.value === "OR") {
      // OR logic - show if dish has at least one included preference
      return dishPreferenceKeys.some((key) =>
        includedPreferences.value.includes(key)
      );
    } else {
      // AND logic - show only if dish has all included preferences
      return includedPreferences.value.every((pref) =>
        dishPreferenceKeys.includes(pref)
      );
    }
  };

  const filterMenuByAllergenPreference = (menuData: any) => {
    if (!menuData) return menuData;

    const filteredData: any = {};

    // Iterate through dates
    Object.keys(menuData).forEach((date) => {
      filteredData[date] = {};

      // Iterate through meals (breakfast, lunch, dinner, brunch)
      Object.keys(menuData[date]).forEach((meal) => {
        filteredData[date][meal] = {};

        // Iterate through dining halls
        Object.keys(menuData[date][meal]).forEach((dhall) => {
          filteredData[date][meal][dhall] = {};

          // Iterate through stations
          Object.keys(menuData[date][meal][dhall]).forEach((station) => {
            const stationDishes: any = {};

            // Filter dishes based on allergen/preference selections
            Object.keys(menuData[date][meal][dhall][station]).forEach(
              (dishName) => {
                const dish = menuData[date][meal][dhall][station][dishName];

                if (shouldShowDish(dish)) {
                  stationDishes[dishName] = dish;
                }
              }
            );

            // Only add station if it has dishes after filtering
            if (Object.keys(stationDishes).length > 0) {
              filteredData[date][meal][dhall][station] = stationDishes;
            }
          });
        });
      });
    });

    return filteredData;
  };

  const getSummary = () => {
    const parts: string[] = [];
    const totalPreferences = Object.keys(PREFERENCES).length;
    const allPreferencesSelected =
      includedPreferences.value.length === totalPreferences;
    const noAllergenExclusions = excludedAllergens.value.length === 0;
    const defaultSettings =
      includeNoPreferences.value && !hideUnknownAllergens.value;

    // If everything is in default state, just show "All dishes selected"
    if (allPreferencesSelected && noAllergenExclusions && defaultSettings) {
      return "All dishes selected";
    }

    // Preferences summary
    if (includedPreferences.value.length > 0) {
      if (allPreferencesSelected && includeNoPreferences.value) {
        parts.push("");
      } else {
        const prefNames = includedPreferences.value
          .map((key) => PREFERENCES[key as keyof typeof PREFERENCES]?.name)
          .filter(Boolean);
        parts.push(`${prefNames.join(` ${preferenceMode.value} `)}`);
      }
    }

    // Allergens summary
    if (excludedAllergens.value.length > 0) {
      const allergenNames = excludedAllergens.value
        .map((key) => ALLERGENS[key as keyof typeof ALLERGENS]?.name)
        .filter(Boolean);
      parts.push(`Exclude: ${allergenNames.join(", ")}`);
    }

    // Additional settings (only show if changed from defaults)
    const settings: string[] = [];
    if (!includeNoPreferences.value)
      settings.push("Show dishes with no preference tags");
    if (hideUnknownAllergens.value)
      settings.push("Exclude dishes with no allergen tags");

    if (settings.length > 0) {
      parts.push(settings.join(" · "));
    }

    return parts.join(" · ");
  };

  // Initialize immediately when composable is used
  initializeFromStorage();

  return {
    // State
    includedPreferences,
    excludedAllergens,
    preferenceMode,
    includeNoPreferences,
    hideUnknownAllergens,
    // Actions
    setIncludedPreferences,
    setExcludedAllergens,
    setPreferenceMode,
    setIncludeNoPreferences,
    setHideUnknownAllergens,
    // Filtering
    filterMenuByAllergenPreference,
    getSummary,
    // Initialization
    initializeFromStorage,
    isInitialized: readonly(isInitialized),
  };
};
