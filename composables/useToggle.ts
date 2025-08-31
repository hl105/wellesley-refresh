const toggled = ref(false);
const isInitialized = ref(false);

const initializeFromStorage = () => {
  if (import.meta.client && !isInitialized.value) {
    const savedState = localStorage.getItem("toggleState");
    if (savedState !== null) {
      toggled.value = savedState === "true";
    }
    isInitialized.value = true;
  }
};

// Initialize immediately when module is imported on client
if (import.meta.client) {
  initializeFromStorage();
}

export { toggled };

export const useToggle = () => {
  initializeFromStorage();

  const toggle = () => {
    toggled.value = !toggled.value;
    if (import.meta.client) {
      localStorage.setItem("toggleState", String(toggled.value));
    }
  };

  return { toggled, toggle };
};
