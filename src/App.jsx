import { useContext, useEffect } from "react";
import axios from "axios";
import "./App.css";
import NavbarPrincipal from "./components/Navbars/NavbarPrincipal";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbars/Navbar";
import NavbarContractor from "./components/Navbars/NavbarContractor";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div id="container" className="container w-7/12 m-auto">
      {user == null ? (
        <Navbar />
      ) : user.TypeOfAccount == "Wykonawca" ? (
        <NavbarContractor />
      ) : (
        <NavbarPrincipal />
      )}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </div>
  );
}

export default App;
