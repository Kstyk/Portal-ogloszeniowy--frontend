import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./Navbar.scss";
import { useState } from "react";

const NavbarContractor = () => {
  const { logoutUser, user } = useContext(AuthContext);
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
            Cześć, {user.FirstName} {user.LastName}
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="/images/avatar.jpg" alt="profile-image" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[100] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52  "
            >
              <li>
                <Link className="justify-between" to="profile/my-profile">
                  Twój profil
                </Link>
              </li>
              <li>
                <Link to="/profile/my-offers">Twoje oferty</Link>
              </li>
              <li>
                <Link to="/profile/edit">Edytuj profil</Link>
              </li>
              <li>
                <Link to="/contractor/edit-categories">
                  Edytuj swoje kategorie
                </Link>
              </li>
              <hr />
              <li>
                <a onClick={logoutUser}>Wyloguj</a>
              </li>
            </ul>
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
          className={`absolute z-[999] right-0 left-0 top-[60px] bg-white border-y-2  mobile-menu ${
            showMobileMenu
              ? "menu-visible menu-fade-in visible"
              : "menu-fade-out"
          }`}
        >
          <ul className="w-full text-lg pt-2 ">
            <li className="pl-5 w-full hover:bg-slate-100 h-10 flex items-center">
              {" "}
              <Link to="/login">Strona główna</Link>
            </li>
            <Link
              className="pl-5 w-full hover:bg-slate-100 h-10 flex items-center"
              to="profile/my-profile"
            >
              Twój profil
            </Link>
            <li>
              <Link
                className="pl-5 w-full hover:bg-slate-100 h-10 flex items-center"
                to="/profile/my-offers"
              >
                Twoje oferty
              </Link>
            </li>
            <li>
              <Link
                className="pl-5 w-full hover:bg-slate-100 h-10 flex items-center"
                to="/profile/edit"
              >
                Edytuj profil
              </Link>
            </li>
            <li>
              <Link
                className="pl-5 w-full hover:bg-slate-100 h-10 flex items-center"
                to="/contractor/edit-categories"
              >
                Edytuj swoje kategorie
              </Link>
            </li>
            <hr />
            <li>
              <a
                className="pl-5 w-full hover:bg-slate-100 h-10 flex items-center"
                onClick={logoutUser}
              >
                Wyloguj
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavbarContractor;
