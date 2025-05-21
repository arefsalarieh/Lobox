export const toggleOption = (option: string, selected: string[], setSelected: (selected: string[]) => void) => {
  if (selected.includes(option)) {
    setSelected(selected.filter((item) => item !== option));
  } else {
    setSelected([...selected, option]);
  }
};
