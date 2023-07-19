import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import MessageComponent from "../components/MessageComponent";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { loginUser, error, setError } = useContext(AuthContext);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <MessageComponent message="Zrejestrowałeś się! Teraz możesz się zalogować do swojego konta" />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="images/logo.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-custom-darkgreen">
          Zaloguj się do swojego konta
        </h2>
      </div>

      <div className="mt-5 mb-5 sm:mx-auto sm:w-full sm:max-w-sm">
        {error != null ? (
          <div className="alert alert-error mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              onClick={() => setError(null)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        ) : (
          ""
        )}

        <form className="space-y-6" onSubmit={loginUser} method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Adres e-mail
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Hasło
              </label>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-semibold text-custom-darkgreen hover:text-custom-darkgreen"
                >
                  Zapomniałeś hasła?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-custom-darkgreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Zaloguj
            </button>
          </div>
        </form>
      </div>

      <div className="container mx-auto px-5 py-5">
        <div className="relative border border-t-gray-600">
          <h2 className="absolute flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="bg-white px-2 text-sm font-medium">Lub</span>
          </h2>
        </div>
      </div>

      <h2 className=" text-center text-sm font-bold leading-9 tracking-tight text-custom-darkgreen">
        Nie masz jeszcze swojego konta?
      </h2>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-custom-darkgreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
        >
          Zarejestruj się
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
