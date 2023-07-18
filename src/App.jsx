import { useContext, useEffect } from "react";
import axios from "axios";
import "./App.scss";
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
import Anonymous from "./components/AccessComponents/Anonymous";
import ListOfOffers from "./pages/ListOfOffers";
import AddOrderPage from "./pages/AddOrderPage";
import Contractor from "./components/AccessComponents/Contractor";
import Principal from "./components/AccessComponents/Principal";
import ContractorsListPage from "./pages/ContractorsListPage";
import ContractorsListByInputPage from "./pages/ContractorsListByInputPage";
import ContractorPage from "./pages/ContractorPage";
import ListOfMyOrders from "./pages/ListOfMyOrders";
import OffersToOrderPage from "./pages/OffersToOrderPage";
import EditOrderPage from "./pages/EditOrderPage";
import EditAreaOfWork from "./pages/EditAreaOfWork";
import AddOpinionPage from "./pages/AddOpinionPage";

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
        <Route path="/" element={<MainPage />} />

        <Route element={<Anonymous />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Route>

        <Route
          path="/orders/:categoryId/:category"
          element={<OrdersListPage />}
        />
        <Route
          path="/orders/search/:searchByQuery"
          element={<OrdersByTexInputPage />}
        />
        <Route path="/orders/order/:orderId" element={<OrderPage />} />

        <Route
          path="/contractors/:categoryId/:category"
          element={<ContractorsListPage />}
        />

        <Route
          path="/contractors/search/:searchByQuery"
          element={<ContractorsListByInputPage />}
        />

        <Route path="/contractors/:contractorId" element={<ContractorPage />} />

        <Route element={<Contractor />}>
          <Route
            path="/profile/my-profile"
            element={<ContractorMyProfilePage />}
          />
          <Route path="/profile/my-offers" element={<ListOfOffers />} />
          <Route
            path="/contractor/add-categories"
            element={<ConfigureContractorAccount />}
          />
          <Route
            path="/contractor/edit-categories"
            element={<EditContractorCategories />}
          />
          <Route
            path="/contractor/edit-area-of-work"
            element={<EditAreaOfWork />}
          />
        </Route>

        <Route element={<Principal />}>
          <Route path="/order/add" element={<AddOrderPage />} />
          <Route
            path="/order/:orderId/offers"
            element={<OffersToOrderPage />}
          />
          <Route
            path="/order/:orderId/offers/:offerId/add-opinion"
            element={<AddOpinionPage />}
          />
          <Route path="/profile/my-orders" element={<ListOfMyOrders />} />
          <Route
            path="/profile/my-orders/:orderId/edit"
            element={<EditOrderPage />}
          />
        </Route>

        <Route path="/profile/edit" element={<EditProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
