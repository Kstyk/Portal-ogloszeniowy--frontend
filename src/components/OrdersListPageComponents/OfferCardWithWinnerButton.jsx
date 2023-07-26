import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const OfferCardWithWinnerButton = (props) => {
  const { offer, order, setAsWinner } = props;

  return (
    <div
      className={`bg-white shadow-xl p-5 mb-5 ${
        offer.isWinner ? "border-l-2 border-t-2 border-green-400" : ""
      } hover:bg-slate-50 duration-200`}
    >
      <div className="flex flex-row justify-between">
        <div>
          <Link
            to={`/contractors/${offer.userId}`}
            className="author font-semibold block"
          >
            {offer?.companyName != "" && offer?.companyName != null
              ? offer?.companyName
              : offer?.firstName + " " + offer?.lastName}
          </Link>
          <span>{dayjs(offer?.publicDate).format("YYYY-MM-DD - HH:mm")}</span>
        </div>
        <div className="price w-4/12 text-center">
          <h3 className="font-semibold">Szacowany koszt</h3>
          <p className="text-xl">
            <span className="font-semibold">{offer.price} zł</span>
            <br /> <span className="text-[17px]">za {offer.priceFor}</span>
          </p>
        </div>
      </div>
      <p className="py-3 mt-3 border-dotted border-t-2 border-b-2">
        {offer?.content}
      </p>
      {order?.winnerOfferId != offer?.id && order?.winnerOfferId == null ? (
        <div className="mt-5">
          <div
            onClick={() => setAsWinner(offer?.id)}
            className="btn btn-outline w-6/12 max-md:w-8/12 max-phone:w-full rounded-none max-md:mx-auto"
          >
            Oznacz jako zwycięzcę
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default OfferCardWithWinnerButton;
