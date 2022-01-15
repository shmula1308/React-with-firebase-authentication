import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App/index";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./components/contexts/AuthContext";
import { DBContextProvider } from "./components/contexts/DBContext";

ReactDOM.render(
  <DBContextProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </DBContextProvider>,
  document.getElementById("root")
);

