import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App/index";
import { AuthContextProvider } from "./components/contexts/AuthContext";
import { DBContextProvider } from "./components/contexts/DBContext";

ReactDOM.render(
  <DBContextProvider>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </DBContextProvider>,
  document.getElementById("root")
);
