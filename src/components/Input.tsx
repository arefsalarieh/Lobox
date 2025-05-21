import { useContext, useState } from "react";
import { MultiSelectContext } from "../context/multiSelectContext";

interface InputProps {
  options: string[];
  setInitialOptions: (options: string[]) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Input: React.FC<InputProps> = ({}) => {
  const {
    isOpen,
    setIsOpen,
    inputValue,
    setInputValue,
    handleInputKeyDown,
  } = useContext(MultiSelectContext);

  return (
    <div className="multi-select__input" onClick={() => setIsOpen(!isOpen)}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => handleInputKeyDown(e)}
        placeholder="Select or type..."
      />
      <span className="multi-select__arrow">{isOpen ? "▲" : "▼"}</span>
    </div>
  );
};

export default Input;
