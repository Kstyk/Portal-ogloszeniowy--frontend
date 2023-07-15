import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const OfferCard = (props) => {
  const { offer } = props;

  return (
    <div className="bg-white border-t-[3px] rounded-t-xl border-t-blue-400 shadow-xl p-5 mb-5">
      <div className="flex flex-row justify-between">
        <div>
          <Link
            to={`/contractors/${offer.userId}`}
            className="author font-semibold block"
          >
            {offer?.companyName != "" && offer?.companyName != null
              ? offer.companyName
              : offer.firstName + " " + offer.lastName}
          </Link>
          <span>{dayjs(offer.publicDate).format("YYYY-MM-DD - HH:mm")}</span>
        </div>
        <div className="price w-4/12 text-center">
          <h3 className="font-semibold">Szacowany koszt</h3>
          <p className="text-xl">
            <span className="font-semibold">{offer.price} zł</span>
            <br /> <span className="text-[17px]">za {offer.priceFor}</span>
          </p>
        </div>
      </div>
      <p className="pt-3 mt-3 border-dotted border-t-2">{offer.content}</p>
    </div>
  );
};

export default OfferCard;
