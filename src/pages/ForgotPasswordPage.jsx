import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { backendUrl } from "../components/content/BackendUrl";
import axios from "axios";
import ErrorMessageComponent from "../components/ErrorMessageComponent";
import LoadingComponent from "../components/LoadingComponent";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSended, setIsSended] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const resetOptions = {
    email: {
      required: "Email jest wymagany.",
    },
  };

  const onSubmit = (data) => {
    setLoading(true);

    axios
      .post(`${backendUrl}/api/account/forgot-password`, data)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setIsSended(true);
      })
      .catch((err) => {
        if (err.response.status == 400) {
          setError(err.response.data.message);
        }
        console.log(err);
        setLoading(false);
      });
  };
  const handleError = (errors) => {};

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="images/logo.png"
          alt="Your Company"
        />
        <h2 className="mt-10 mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-custom-darkgreen">
          Zresetuj hasło do swojego konta
        </h2>
        {loading ? (
          <LoadingComponent message="Pobieramy informacje z serwera..." />
        ) : isSended ? (
          <div className="text-center">
            Wysłaliśmy link do resetu hasła na podany przez Ciebie email.
            Przejdź pod link wysłany w mailu w celu zresetowania hasła.
          </div>
        ) : (
          <>
            <ErrorMessageComponent data={{ error, setError }} />
            <form onSubmit={handleSubmit(onSubmit, handleError)}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                {...register("email", resetOptions.email)}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="text-[11px] text-red-400">
                <span>{errors.email && errors.email.message}</span>
              </span>
              <button
                type="submit"
                className=" mt-5 flex w-full justify-center rounded-md bg-custom-darkgreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Wyślij link do resetowania hasła na podany email
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
