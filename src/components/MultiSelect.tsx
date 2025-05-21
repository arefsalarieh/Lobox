import React, { useState, useEffect, useRef, useContext } from "react";
import "../styles/multi-select.scss";
import { MultiSelectContext } from "../context/multiSelectContext";

interface MultiSelectProps {
  options: string[];
  isOpen: Boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({}) => {
  const {
    selected,
    toggleOption,
    wrapperRef,
    initialOptions,
    isOpen,
    handleClickOutside
  } = useContext(MultiSelectContext);

  useEffect(() => {
    const handleClick = (e: MouseEvent) =>
      handleClickOutside(e); //
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={wrapperRef}>
      {isOpen && (
        <div className="multi-select__dropdown">
          {initialOptions.map((option) => (
            <div
              key={option}
              className={`multi-select__option ${
                selected.includes(option) ? "selected" : ""
              }`}
              onClick={() => toggleOption(option)}
            >
              <span>{option}</span>
              {selected.includes(option) && (
                <span className="multi-select__check">✓</span>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default MultiSelect;
