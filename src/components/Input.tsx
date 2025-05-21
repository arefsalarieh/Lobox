import { useContext } from "react";
import { MultiSelectContext } from "../context/multiSelectContext";

const Input = ({}) => {
  const { isOpen, setIsOpen, inputValue, setInputValue, handleInputKeyDown } =
    useContext(MultiSelectContext);

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
