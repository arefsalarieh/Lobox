import React, { useState } from "react";
import MultiSelect from "./components/MultiSelect";
import "./styles/multi-select.scss";
import Input from "./components/Input";
import { MultiSelectContextProvider } from "./context/multiSelectContext";

const App: React.FC = () => {
  const [initialOptions, setInitialOptions] = useState<string[]>(["Education", "Art", "Sport", "Games", "Health"]);
  const [isOpen, setIsOpen] = useState(false);



  return (
    <MultiSelectContextProvider>
      <div className="multi-select"  >
        <h1>Multi Select Demo</h1>
        <Input options={initialOptions} setInitialOptions={setInitialOptions} isOpen={isOpen} setIsOpen={setIsOpen}/>
        <MultiSelect options={initialOptions} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </MultiSelectContextProvider>
  );
};

export default App;
