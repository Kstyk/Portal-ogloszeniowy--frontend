import { useEffect } from "react";
import axios from "axios";
import "./App.css";
import NavbarPrincipal from "./components/NavbarPrincipal";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div id="container" className="container w-7/12 m-auto">
      <NavbarPrincipal />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
