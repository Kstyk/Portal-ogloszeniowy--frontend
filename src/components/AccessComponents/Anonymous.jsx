import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const Anonymous = () => {
  const { user } = useContext(AuthContext);

  return user != null ? <Navigate to="/" replace /> : <Outlet />;
};

export default Anonymous;
