import { create } from "zustand";
import type { Option } from "../types/type";
import { v4 as uuidv4 } from "uuid";

interface MultiSelectState {
  initialOptions: Option[];
  selected: string[];
  inputValue: string;
  isOpen: boolean;
  setInitialOptions: (options: Option[]) => void;
  setSelected: (selected: string[]) => void;
  setInputValue: (inputValue: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleClickOutside: (event: MouseEvent, wrapperRef: React.RefObject<HTMLDivElement | null>) => void;
  toggleOption: (inputValue: string) => void;
  handleDeleteOption: (id: string) => void;
}

export const useMultiSelect = create<MultiSelectState>((set, get) => ({
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
  setInitialOptions: (options: Option[]) => set({ initialOptions: options }),
  setSelected: (selected: string[]) => set({ selected }),
  setInputValue: (inputValue: string) => set({ inputValue }),
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { inputValue, initialOptions } = get();
    if (e.key === "Enter" && inputValue.trim()) {
      const newOption = { id: uuidv4(), name: inputValue.trim() };
      if (!initialOptions.some((option) => option.name === inputValue.trim())) {
        set({ initialOptions: [...initialOptions, newOption] });
      }
      set({ inputValue: "" });
    }
  },
  handleClickOutside: (event: MouseEvent, wrapperRef: React.RefObject<HTMLDivElement | null>) => {
    if (
      wrapperRef?.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      set({ isOpen: false });
    }
  },
  toggleOption: (inputValue: string) => {
    const { selected } = get();
    set({
      selected: selected.includes(inputValue)
        ? selected.filter((option) => option !== inputValue)
        : [...selected, inputValue],
    });
  },
  handleDeleteOption: (id: string) => {
    const { initialOptions } = get();
    set({
      initialOptions: initialOptions.filter((option) => option.id !== id),
    });
  },
}));
