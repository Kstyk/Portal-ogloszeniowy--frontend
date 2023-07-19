import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { backendUrl } from "../components/content/BackendUrl";
import MessageComponent from "../components/MessageComponent";
import ErrorMessageComponent from "../components/ErrorMessageComponent";

const ResetPasswordPage = () => {
  const [resetToken, setResetToken] = useState();
  const [backendErrors, setBackendErrors] = useState([]);
  const [ifSuccess, setIfSuccess] = useState();
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const resetOptions = {
    password: {
      required: "Hasło jest wymagane",
      minLength: {
        value: 4,
        message: "Hasło musi mieć przynajmniej 4 znaki",
      },
    },
    confirmPassword: {
      required: "Musisz powtórzyć hasło",
      validate: (val) => {
        if (watch("password") != val) {
          return "Hasła nie są identyczne";
        }
      },
    },
  };

  const onSubmit = (data) => {
    data.resetPasswordToken = resetToken;

    axios
      .post(`${backendUrl}/api/account/reset-password`, data)
      .then((res) => {
        reset();
        setIfSuccess(true);
        setMessage(
          "Poprawnie zresetowałeś swoje hasło. Możesz powrócić do strony logowania."
        );
      })
      .catch((err) => {
        setIfSuccess(false);
        if (err.response.status == 400) {
          setError(err.response.data.message);
        }
        console.log(err);
      });
  };
  const handleError = (errors) => {};

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    setResetToken(token);
    // Możesz teraz wykorzystać wartość token w dalszej części komponentu lub przekazać do odpowiedniej funkcji obsługującej resetowanie hasła
    console.log(token);
  }, []);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="images/logo.png"
          alt="Your Company"
        />
        <h2 className="mt-10 mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-custom-darkgreen">
          Ustaw nowe hasło do swojego konta
        </h2>
        {ifSuccess ? (
          <div
            style={{ display: ifSuccess ? "inline-flex" : "none" }}
            className="alert alert-success mb-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span className="text-center w-full">{message}</span>
          </div>
        ) : (
          <ErrorMessageComponent data={{ error, setError }} />
        )}
        <form onSubmit={handleSubmit(onSubmit, handleError)}>
          <label
            htmlFor="password"
            className="block text-sm leading-6 font-bold text-custom-darkgreen"
          >
            Hasło
          </label>
          <div className="mb-2">
            <input
              id="password"
              name="password"
              type="password"
              {...register("password", resetOptions.password)}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
            />
            <span className="text-[11px] text-red-400">
              <span>{errors.password && errors.password.message}</span>
              <span className="flex flex-col">
                {backendErrors?.Password &&
                  backendErrors.Password.map((err) => (
                    <span key={err}>{err}</span>
                  ))}
              </span>
            </span>
          </div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm leading-6 font-bold text-custom-darkgreen"
          >
            Powtórz hasło
          </label>
          <div className="mb-2">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              {...register("confirmPassword", resetOptions.confirmPassword)}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
            />
            <span className="text-[11px] text-red-400">
              <span>
                {errors.confirmPassword && errors.confirmPassword.message}
              </span>
              <span className="flex flex-col">
                {backendErrors?.ConfirmPassword &&
                  backendErrors.ConfirmPassword.map((err) => (
                    <span key={err}>{err}</span>
                  ))}
              </span>
            </span>
          </div>
          <button
            type="submit"
            className=" mt-5 flex w-full justify-center rounded-md bg-custom-darkgreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Ustaw nowe hasło
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
