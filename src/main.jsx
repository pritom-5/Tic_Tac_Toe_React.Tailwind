import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ListContextProvider } from "./store/ListContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ListContextProvider>
      <App />
    </ListContextProvider>
  </React.StrictMode>
);
