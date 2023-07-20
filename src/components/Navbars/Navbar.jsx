import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <div className="navbar mb-5 max-phone:hidden" data-theme="light">
        <div className="flex-1">
          <Link
            className="btn border-none bg-white hover:bg-white normal-case text-xl"
            to="/"
          >
            <img src="/images/logo.png" alt="" className="h-full" />
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control pr-5 mr-5 border-r-2">
            <Link to="/login">Zaloguj</Link>
          </div>
          <div className="form-control pr-5 mr-5 border-r-2">
            <Link to="/register">Zarejestruj</Link>
          </div>
        </div>
      </div>
      <div className="navbar bg-base-100 phone:hidden pl-0 relative">
        <div className="flex-1">
          <Link
            className="btn border-none bg-white hover:bg-white normal-case text-xl"
            to="/"
          >
            <img src="/images/logo.png" alt="" className="h-full" />
          </Link>
        </div>
        <div className="flex-none">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setShowMobileMenu((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`absolute z-[999] right-0 left-0 top-[60px] bg-white border-y-2 pb-5 mobile-menu ${
            showMobileMenu ? "menu-visible menu-fade-in" : "menu-fade-out"
          }`}
        >
          <ul className="w-full text-lg pt-2 ">
            <li className="pl-5 w-full hover:bg-slate-100 h-10 flex items-center">
              {" "}
              <Link to="/login">Strona główna</Link>
            </li>
            <li className="pl-5 w-full hover:bg-slate-100 h-10 flex items-center">
              {" "}
              <Link to="/login">Zaloguj</Link>
            </li>
            <li className="pl-5 w-full hover:bg-slate-100 h-10 flex items-center">
              {" "}
              <Link to="/register">Zarejestruj</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
