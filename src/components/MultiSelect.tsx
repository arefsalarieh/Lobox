import React, { useState, useEffect, useRef } from "react";
import "../styles/multi-select.scss";
import { handleClickOutside } from "../../utils/handleClickOutside";
import { toggleOption } from "../../utils/toggleOption";

interface MultiSelectProps {
  options: string[];
  isOpen: Boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options = [],
  isOpen,
  setIsOpen,
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) =>
      handleClickOutside(e, wrapperRef!, setIsOpen);
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={wrapperRef}>
      {isOpen && (
        <div className="multi-select__dropdown">
          {options.map((option) => (
            <div
              key={option}
              className={`multi-select__option ${
                selected.includes(option) ? "selected" : ""
              }`}
              onClick={() => toggleOption(option, selected, setSelected)}
            >
              <span>{option}</span>
              {selected.includes(option) && (
                <span className="multi-select__check">✓</span>
              )}
            </div>
          ))}
          {/* {inputValue && !options.includes(inputValue) && (
            <div
              className="multi-select__option new-option"
              onClick={() => {
                if (!selected.includes(inputValue.trim())) {
                  setSelected([...selected, inputValue.trim()]);
                  if (onChange) onChange([...selected, inputValue.trim()]);
                  setInputValue("");
                }
              }}
            >
              Add "{inputValue}"
            </div>
          )} */}
        </div>
      )}
      {/* {selected.length > 0 && (
        <div className="multi-select__selected">
          {selected.map((item) => (
            <span key={item} className="multi-select__tag">
              {item}{" "}
              <span
                className="multi-select__remove"
                onClick={() => toggleOption(item)}
              >
                ×
              </span>
            </span>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default MultiSelect;
