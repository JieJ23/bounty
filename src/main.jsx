import "./index.css";
import App from "./App.jsx";

import { DataProvider } from "./Hook/FetchData.jsx";
import React from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    </DataProvider>
  </React.StrictMode>
);
