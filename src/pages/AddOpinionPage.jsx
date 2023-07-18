import React, { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessageComponent from "../components/ErrorMessageComponent";

const AddOpinionPage = () => {
  const api = useAxios();
  const { orderId, offerId } = useParams();
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      punctuality: 5,
      communication: 5,
      workQuality: 5,
      meetingTheConditions: 5,
    },
  });

  const addOpinionOptions = {
    comment: { required: "Komentarz jest wymagany." },
  };

  const onSubmit = (data) => {
    console.log(data);

    api
      .post(`/api/order/${offerId}/add-opinion`, data)
      .then((res) => {
        console.log(res);
        nav(`/order/${orderId}/offers?success`);
      })
      .catch((err) => {
        if (err.response.status == 400) {
          setError(err.response.data.message);
        } else {
          console.log(err);
        }
      });
  };

  const handleError = (errors) => {};
  return (
    <div>
      <div className="absolute top-[6rem] left-0 right-0 h-[180px] z-0 bg-green-400"></div>
      <div className="card shadow-xl mt-[120px] p-4 pt-8 z-20 relative bg-base-100 max-lg:w-full text-custom-darkgreen mb-10">
        <div className="w-full max-sm:w-full flex flex-col p-2 lg:px-8 justify-center">
          <h1 className="uppercase text-2xl font-semibold pb-2 border-b-[2px] border-dotted">
            Dodaj Opinię Dla Wykonawcy
          </h1>
          <ErrorMessageComponent data={{ error, setError }} />
          <form onSubmit={handleSubmit(onSubmit, handleError)}>
            <label
              htmlFor="workQuality"
              className="block text-sm leading-6 font-bold mt-8 text-center text-custom-darkgreen"
            >
              Jakość pracy
            </label>
            <div className="rating phone:rating-lg flex justify-center">
              {Array.from({ length: 5 }, (_, index) => (
                <input
                  key={index}
                  type="radio"
                  name="workQuality"
                  {...register("workQuality")}
                  value={`${index + 1}`}
                  className="mask mask-star bg-custom-darkgreen"
                />
              ))}
            </div>
            <label
              htmlFor="punctuality"
              className="block text-sm leading-6 font-bold mt-8 text-center text-custom-darkgreen"
            >
              Terminowość
            </label>
            <div className="rating phone:rating-lg flex justify-center">
              {Array.from({ length: 5 }, (_, index) => (
                <input
                  key={index}
                  type="radio"
                  name="punctuality"
                  {...register("punctuality")}
                  value={`${index + 1}`}
                  className="mask mask-star bg-custom-darkgreen"
                />
              ))}
            </div>
            <label
              htmlFor="comunication"
              className="block text-sm leading-6 font-bold mt-8 text-center text-custom-darkgreen"
            >
              Komunikacja
            </label>
            <div className="rating phone:rating-lg flex justify-center">
              {Array.from({ length: 5 }, (_, index) => (
                <input
                  key={index}
                  type="radio"
                  name="communication"
                  {...register("communication")}
                  value={`${index + 1}`}
                  className="mask mask-star bg-custom-darkgreen"
                />
              ))}
            </div>
            <label
              htmlFor="meetingTheConditions"
              className="block text-sm leading-6 font-bold mt-8 text-center text-custom-darkgreen"
            >
              Spełnianie warunków
            </label>
            <div className="rating phone:rating-lg flex justify-center">
              {Array.from({ length: 5 }, (_, index) => (
                <input
                  key={index}
                  type="radio"
                  name="meetingTheConditions"
                  {...register("meetingTheConditions")}
                  value={`${index + 1}`}
                  className="mask mask-star bg-custom-darkgreen"
                />
              ))}
            </div>
            <label
              htmlFor="meetingTheConditions"
              className="block text-sm leading-6 font-bold mt-8 text-center text-custom-darkgreen"
            >
              Komentarz
            </label>
            <textarea
              id="comment"
              name="comment"
              placeholder="Wprowadź tekst komentarza"
              {...register("comment", addOpinionOptions.comment)}
              className="textarea  w-full block rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white focus:outline-none mt-2"
            />
            <span className="text-[11px] text-red-400">
              <span>{errors.comment && errors.comment.message}</span>
            </span>
            <button
              type="submit"
              className="mt-5 flex w-full justify-center rounded-md bg-custom-darkgreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Dodaj opinię
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOpinionPage;
