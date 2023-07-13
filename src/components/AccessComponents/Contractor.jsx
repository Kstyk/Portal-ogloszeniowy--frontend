import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const Contractor = () => {
  const { user } = useContext(AuthContext);

  return user != null && user?.TypeOfAccount == "Wykonawca" ? (
    <>
      {console.log("aythrozied")}
      <Outlet />
    </>
  ) : (
    <>
      {" "}
      {console.log("unauthorized")} <Navigate to="/" replace />{" "}
    </>
  );
};

export default Contractor;
