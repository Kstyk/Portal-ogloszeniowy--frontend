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
import ConfigureContractorAccount from "./pages/ConfigureContractorAccount";
import EditContractorCategories from "./pages/EditContractorCategories";
import OrdersListPage from "./pages/OrdersListPage";
import OrdersByTexInputPage from "./pages/OrdersByTexInputPage";
import OrderPage from "./pages/OrderPage";
import ContractorMyProfilePage from "./pages/ContractorMyProfilePage";
import EditProfilePage from "./pages/EditProfilePage";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div
      id="container"
      className="container max-sm:w-full max-lg:w-9/12 lg:w-7/12 m-auto"
    >
      {user == null ? (
        <Navbar />
      ) : user.TypeOfAccount == "Wykonawca" ? (
        <NavbarContractor />
      ) : (
        <NavbarPrincipal />
      )}
      <Routes>
        <Route path="" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        <Route
          path="/contractor/add-categories"
          element={<ConfigureContractorAccount />}
        />
        <Route
          path="/contractor/edit-categories"
          element={<EditContractorCategories />}
        />

        <Route path="/orders/:category" element={<OrdersListPage />} />
        <Route
          path="/orders/search/:searchByQuery"
          element={<OrdersByTexInputPage />}
        />
        <Route path="/orders/order/:orderId" element={<OrderPage />} />

        {user != null && user?.TypeOfAccount == "Wykonawca" ? (
          <Route
            path="/profile/my-profile"
            element={<ContractorMyProfilePage />}
          />
        ) : (
          <></>
        )}

        <Route path="/profile/edit" element={<EditProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
