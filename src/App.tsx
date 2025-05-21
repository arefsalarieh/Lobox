import React from "react";
import MultiSelect from "./components/MultiSelect";
import "./styles/multi-select.scss";
import Input from "./components/Input";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="multi-select">
        <h1>Multi Select Demo</h1>
        <Input />
        <MultiSelect />
      </div>
    </Provider>
  );
};

export default App;
