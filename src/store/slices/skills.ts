import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Option } from "../../types/type";
import { v4 as uuidv4 } from "uuid";

interface SkillsState {
  initialOptions: Option[];
  selected: string[];
  inputValue: string;
  isOpen: boolean;
}

const initialState: SkillsState = {
  initialOptions: [
    { id: uuidv4(), name: "Education" },
    { id: uuidv4(), name: "Art" },
    { id: uuidv4(), name: "Sport" },
    { id: uuidv4(), name: "Games" },
    { id: uuidv4(), name: "Health" },
  ],
  selected: [],
  inputValue: "",
  isOpen: false,
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setInitialOptions: (state, action: PayloadAction<Option[]>) => {
      state.initialOptions.push(...action.payload);
    },
    setSelected: (state, action: PayloadAction<string[]>) => {
      state.selected.push(...action.payload);
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    handleInputKeyDown: (state, action: PayloadAction<React.KeyboardEvent<HTMLInputElement>>) => {
      const { inputValue, initialOptions } = state;
      if (action.payload.key === "Enter" && inputValue.trim()) {
        const newOption = { id: uuidv4(), name: inputValue.trim() };
        if (!initialOptions.some((option) => option.name === inputValue.trim())) {
          state.initialOptions = [...initialOptions, newOption];
        }
        state.inputValue = "";
      }
    },
    handleClickOutside: (state, action: PayloadAction<{ event: MouseEvent; wrapperRef: React.RefObject<HTMLDivElement | null> }>) => {
      const { wrapperRef } = action.payload;
      if (wrapperRef?.current && !wrapperRef.current.contains(action.payload.event.target as Node)) {
        state.isOpen = false;
      }
    },
    toggleOption: (state, action: PayloadAction<string>) => {
      const inputValue = action.payload;
      state.selected = state.selected.includes(inputValue)
        ? state.selected.filter((option) => option !== inputValue)
        : [...state.selected, inputValue];
    },
    handleDeleteOption: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.initialOptions = state.initialOptions.filter((option) => option.id !== id);
    },
  },
});

export const {
  setInitialOptions,
  setSelected,
  setInputValue,
  setIsOpen,
  handleInputKeyDown,
  handleClickOutside,
  toggleOption,
  handleDeleteOption,
} = skillsSlice.actions;

export default skillsSlice.reducer;