import { useState } from "react";
import { handleInputKeyDown } from "../../utils/handleInputKeyDown";

interface InputProps {
  options: string[];
  setInitialOptions: (options: string[]) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Input: React.FC<InputProps> = ({
  options,
  setInitialOptions,
  isOpen,
  setIsOpen,
}) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="multi-select__input" onClick={() => setIsOpen(!isOpen)}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) =>
          handleInputKeyDown(
            e,
            inputValue,
            options,
            setInitialOptions,
            setInputValue
          )
        }
        placeholder="Select or type..."
      />
      <span className="multi-select__arrow">{isOpen ? "▲" : "▼"}</span>
    </div>
  );
};

export default Input;
