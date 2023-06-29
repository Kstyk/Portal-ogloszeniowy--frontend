import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar mb-5" data-theme="light">
      <div className="flex-1">
        <Link
          className="btn border-none bg-white hover:bg-white normal-case text-xl"
          to="/"
        >
          <img src="src/assets/images/logo.png" alt="" className="h-full" />
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control pr-5 mr-5 border-r-2">
          <Link to="/login">Zaloguj</Link>
        </div>
        <div className="form-control pr-5 mr-5 border-r-2">Zarejestruj</div>
      </div>
    </div>
  );
};

export default Navbar;
