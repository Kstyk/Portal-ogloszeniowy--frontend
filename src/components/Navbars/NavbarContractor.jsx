import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const NavbarContractor = () => {
  const { logoutUser } = useContext(AuthContext);

  return (
    <div className="navbar mb-5" data-theme="light">
      <div className="flex-1">
        <Link
          className="btn border-none bg-white hover:bg-white normal-case text-xl"
          to="/"
        >
          <img src="/images/logo.png" alt="" className="h-full" />
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control pr-5 mr-5 border-r-2">Cześć, username</div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/images/avatar.jpg" alt="profile-image" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">Twój profil</a>
            </li>
            <li>
              <a>Twoje oferty</a>
            </li>
            <li>
              <a>Edytuj profil</a>
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
  );
};

export default NavbarContractor;
