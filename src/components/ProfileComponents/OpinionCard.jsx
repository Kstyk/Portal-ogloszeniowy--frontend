import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const OpinionCard = (props) => {
  const { opinion } = props;
  return (
    <div key={opinion?.id}>
      <div
        data-theme="cmyk"
        className="px-5 py-5 text-custom-darkgreen card card-side shadow-xl mb-2 rounded-none flex flex-col"
      >
        <span className="text-xs text-gray-400">
          Dodano: {dayjs(opinion.createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </span>
        <div className="text-lg max-phone:text-base pb-2 border-b-2 border-b-base-200">
          <span className="mr-1">Zlecenie: </span>
          <Link
            className="font-bold transition duration-300 ease-in-out  decoration-transparent hover:underline hover:text-cyan-700 hover:decoration-cyan-700"
            to={`/orders/order/${opinion?.orderId}`}
          >
            {opinion?.title}
          </Link>
        </div>

        <div className="flex flex-row py-5 max-[900px]:flex-col border-b-2">
          <div className="w-6/12 max-[900px]:w-full pr-3 border-r-2 max-[900px]:border-r-0 max-[900px]:border-b-2 max-[900px]:pb-5 flex flex-col gap-y-2">
            <div className="flex flex-row justify-between items-center max-[320px]:flex-col max-[320px]:justify-center">
              <label htmlFor="workQuality" className="max-phone:text-sm">
                Jakość pracy
              </label>
              <div className="rating">
                {Array.from({ length: 5 }, (_, index) => (
                  <input
                    key={index}
                    type="radio"
                    name="workQuality"
                    className="mask mask-star bg-custom-darkgreen"
                    checked={opinion?.workQuality == index + 1 ? true : false}
                    readOnly
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-row justify-between items-center max-[320px]:flex-col max-[320px]:justify-center">
              <label htmlFor="punctuality" className="max-phone:text-sm">
                Terminowość
              </label>
              <div className="rating">
                {Array.from({ length: 5 }, (_, index) => (
                  <input
                    key={index}
                    type="radio"
                    name="punctuality"
                    className="mask mask-star bg-custom-darkgreen"
                    checked={opinion?.punctuality == index + 1 ? true : false}
                    readOnly
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-row justify-between items-center max-[320px]:flex-col max-[320px]:justify-center">
              <label htmlFor="comunication" className="max-phone:text-sm">
                Komunikacja
              </label>
              <div className="rating">
                {Array.from({ length: 5 }, (_, index) => (
                  <input
                    key={index}
                    type="radio"
                    name="comunication"
                    className="mask mask-star bg-custom-darkgreen"
                    checked={opinion?.comunication == index + 1 ? true : false}
                    readOnly
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-row justify-between items-center max-[320px]:flex-col max-[320px]:justify-center">
              <label
                htmlFor="meetingTheConditions"
                className="max-phone:text-sm"
              >
                Spełnianie warunków
              </label>
              <div className="rating">
                {Array.from({ length: 5 }, (_, index) => (
                  <input
                    key={index}
                    type="radio"
                    name="meetingTheConditions"
                    className="mask mask-star bg-custom-darkgreen"
                    checked={
                      opinion?.meetingTheConditions == index + 1 ? true : false
                    }
                    readOnly
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="w-6/12 max-[900px]:w-full px-3 max-[900px]:px-0 max-[900px]:pt-5 max-phone:text-sm break-words">
            <span className="font-bold">Komentarz: </span>
            {opinion?.comment}
          </div>
        </div>
        <div className="mt-3 max-phone:text-base">
          Końcowa, uśredniona ocena:{" "}
          <span className="font-bold">{opinion?.finalRate}</span>
        </div>
      </div>
    </div>
  );
};

export default OpinionCard;
