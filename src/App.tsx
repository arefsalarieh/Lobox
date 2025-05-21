import React from "react";
import MultiSelect from "./components/MultiSelect";
import "./styles/multi-select.scss";
import Input from "./components/Input";

const App: React.FC = () => {
  return (
    <div className="multi-select">
      <h1>Multi Select Demo</h1>
      <Input />
      <MultiSelect />
    </div>
  );
};

export default App;
