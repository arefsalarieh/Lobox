import { createContext, useState, useRef } from "react";
import type { ReactNode } from "react";

interface MultiSelectContextType {
  initialOptions: string[];
  setInitialOptions: (options: string[]) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleClickOutside: (event: MouseEvent) => void;
  toggleOption: (inputValue: string) => void;
  selected: string[];
  setSelected: (selected: string[]) => void;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
}

export const MultiSelectContext = createContext<MultiSelectContextType>({
  initialOptions: [],
  setInitialOptions: () => {},
  isOpen: false,
  setIsOpen: () => {},
  handleInputKeyDown: () => {},
  handleClickOutside: () => {},
  toggleOption: () => {},
  selected: [],
  setSelected: () => {},
  wrapperRef: { current: null },
  inputValue: "",
  setInputValue: () => {},
});

export const MultiSelectContextProvider = ({ children }: { children: ReactNode }) => {
  const [initialOptions, setInitialOptions] = useState<string[]>([
    "Education",
    "Art",
    "Sport",
    "Games",
    "Health",
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      if (!initialOptions.includes(inputValue.trim())) {
        setInitialOptions([...initialOptions, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const toggleOption = (inputValue: string) => {
    if (selected.includes(inputValue)) {
      setSelected(selected.filter((item) => item !== inputValue));
    } else {
      setSelected([...selected, inputValue]);
    }
  };

  return (
    <MultiSelectContext.Provider
      value={{
        initialOptions,
        setInitialOptions,
        isOpen,
        setIsOpen,
        handleInputKeyDown,
        handleClickOutside,
        toggleOption,
        selected,
        setSelected,
        wrapperRef,
        inputValue,
        setInputValue,
      }}
    >
      {children}
    </MultiSelectContext.Provider>
  );
};
