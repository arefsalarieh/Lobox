import { createContext, useState, useRef } from "react";
import type { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Option } from "../../types/type";

interface MultiSelectContextType {
  initialOptions: Option[];
  setInitialOptions: (options: Option[]) => void;
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
  handleDeleteOption: (id: string) => void;
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
  handleDeleteOption: () => {},
});

export const MultiSelectContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [initialOptions, setInitialOptions] = useState<Option[]>([
    { id: uuidv4(), name: "Education" },
    { id: uuidv4(), name: "Art" },
    { id: uuidv4(), name: "Sport" },
    { id: uuidv4(), name: "Games" },
    { id: uuidv4(), name: "Health" },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const newOption = { id: uuidv4(), name: inputValue.trim() };
      if (!initialOptions.some(option => option.name === inputValue.trim())) {
        setInitialOptions([...initialOptions, newOption]);
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

  const handleDeleteOption = (id: string) => {
    setInitialOptions(initialOptions.filter((item) => item.id !== id));
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
        handleDeleteOption,
      }}
    >
      {children}
    </MultiSelectContext.Provider>
  );
};
