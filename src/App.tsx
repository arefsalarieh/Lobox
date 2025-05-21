import React from "react";
import MultiSelect from "./components/MultiSelect";
import "./styles/multi-select.scss";
import Input from "./components/Input";
import { MultiSelectContextProvider } from "./context/multiSelectContext";

const App: React.FC = () => {
  return (
    <MultiSelectContextProvider>
      <div className="multi-select">
        <h1>Multi Select Demo</h1>
        <Input />
        <MultiSelect />
      </div>
    </MultiSelectContextProvider>
  );
};

export default App;
