import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const Principal = () => {
  const { user } = useContext(AuthContext);

  return user != null && user?.TypeOfAccount == "Zleceniodawca" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default Principal;
