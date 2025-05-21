import React, { useEffect, useRef } from "react";
import "../styles/multi-select.scss";

import { useMultiSelect } from "../zustand/multiSelectZustand";

const MultiSelect = ({}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const {
    initialOptions,
    selected,
    isOpen,
    handleClickOutside,
    handleDeleteOption,
    toggleOption,
  } = useMultiSelect();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => handleClickOutside(e, wrapperRef);
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={wrapperRef}>
      {isOpen && (
        <div className="multi-select__dropdown">
          {initialOptions.map((option) => (
            <div
              key={option.id}
              className={`multi-select__option ${
                selected.includes(option.name) ? "selected" : ""
              }`}
              onClick={() => toggleOption(option.name)}
            >
              <span>{option.name}</span>
              {selected.includes(option.name) && (
                <span className="multi-select__check">✓</span>
              )}
              <span
                className="multi-select__dropdown__delete"
                onClick={() => handleDeleteOption(option.id)}
              >
                ×
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
