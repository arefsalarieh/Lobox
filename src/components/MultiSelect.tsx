import  { useEffect, useRef } from "react";
import "../styles/multi-select.scss";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import type { Option } from "../types/type";
import { handleClickOutside, handleDeleteOption, toggleOption } from "../store/slices/skills";

const MultiSelect = ({}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { initialOptions, selected, isOpen } = useSelector((state: RootState) => state.skills);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => dispatch(handleClickOutside({ event: e, wrapperRef }));
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dispatch]);

  return (
    <div ref={wrapperRef}>
      {isOpen && (
        <div className="multi-select__dropdown">
          {initialOptions.map((option: Option) => (
            <div
              key={option.id}
              className={`multi-select__option ${
                selected.includes(option.name) ? "selected" : ""
              }`}
              onClick={() => dispatch(toggleOption(option.name))}
            >
              <span>{option.name}</span>
              {selected.includes(option.name) && (
                <span className="multi-select__check">✓</span>
              )}
              <span
                className="multi-select__dropdown__delete"
                onClick={() => dispatch(handleDeleteOption(option.id))}
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
