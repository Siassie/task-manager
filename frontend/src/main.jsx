import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // Import BrowserRouter
import App from "./App";
import "./index.css";

// Wrap the App with BrowserRouter so routes work
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap with BrowserRouter */}
      <App />  
    </BrowserRouter>
  </React.StrictMode>
);