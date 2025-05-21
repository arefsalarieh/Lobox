import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import type { Option } from "../types/type";
import {
  setIsOpen,
  setInputValue,
  handleInputKeyDown,
} from "../store/slices/skills";

const Input = () => {
  const { isOpen, inputValue } = useSelector(
    (state: RootState) => state.skills
  );
  const dispatch = useDispatch();

  return (
    <div className="multi-select__input" onClick={() => dispatch(setIsOpen(!isOpen))}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => dispatch(setInputValue(e.target.value))}
        onKeyDown={(e) => dispatch(handleInputKeyDown(e))}
        placeholder="Select or type..."
      />
      <span className="multi-select__arrow">{isOpen ? "▲" : "▼"}</span>
    </div>
  );
};

export default Input;
