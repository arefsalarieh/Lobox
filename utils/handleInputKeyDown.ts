export const handleInputKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  inputValue: string,
  options: string[],
  setInitialOptions: (options: string[]) => void,
  setInputValue: (value: string) => void
) => {
  if (e.key === "Enter" && inputValue.trim()) {
    if (!options.includes(inputValue.trim())) {
      setInitialOptions([...options, inputValue.trim()]);
    }
    setInputValue("");
  }
};
