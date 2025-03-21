export const toggled = ref(false);

export const useToggle = () => {
  const toggle = () => {
    toggled.value = !toggled.value;
  };
  return { toggled, toggle };
};
