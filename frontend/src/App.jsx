import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [theme, setTheme] = useState("forest");

  return (
    <div>
      <ToastContainer />
      <div
        className="min-h-screen bg-base-200 transition-colors duration-300"
        data-theme={theme}
      >
        <Navbar theme={theme} setTheme={setTheme} />

        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
