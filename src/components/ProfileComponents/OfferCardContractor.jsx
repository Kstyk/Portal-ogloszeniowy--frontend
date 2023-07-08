import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const OfferCardContractor = ({ offer }) => {
  const startDate = offer.startDate;
  const dateObj = new Date(startDate);
  const formattedDate = dateObj.toISOString().split("T")[0];
  const dateNow = dayjs();

  const diffDates = dateNow.diff(formattedDate, "days");
  const daysLeft = offer.publicationDays - diffDates;
  return (
    <div className="card-body max-lg:w-full shadow-xl">
      <span className="text-sm text-gray-400 flex flex-row justify-between">
        <span>Kategoria: {offer.category.name}</span>
        <span>
          {offer.isActive
            ? `Pozostało dni: ${daysLeft}`
            : "Zakończono zlecenie"}
        </span>
      </span>
      <Link
        to={`/orders/order/${offer.orderId}`}
        state={{ orderId: offer.orderId }}
        className="card-title"
      >
        {offer.orderTitle}
      </Link>
      <span className="border-t-2 pt-2">
        <b>Twoja oferta:</b> {offer.content}
      </span>
      <span>
        <span className="font-bold">Szacowany koszt: </span>
        <span className="text-lg">
          {offer.price} zł za {offer.priceFor}
        </span>
      </span>
      <div className="flex flex-row justify-between gap-x-5 border-t-2 pt-3">
        <button className="btn btn-outline w-2/12 max-md:w-4/12 max-[300px]:w-5/12 rounded-none">
          Edytuj
        </button>
        <button className="btn btn-outline btn-error w-2/12 max-md:w-4/12 max-[300px]:w-5/12 rounded-none">
          Usuń
        </button>
      </div>
    </div>
  );
};

export default OfferCardContractor;
