import React from "react";
import "../OrderCard.css";

const OrderCard = ({ order }) => {
  const startDate = order.startDate;
  const dateObj = new Date(startDate);
  const formattedDate = dateObj.toISOString().split("T")[0];
  return (
    <div className="card card-side bg-base-100 shadow-xl mb-2 ">
      <div
        className={`box w-2/12 my-5 lg:ml-3 flex justify-center items-center px-2 max-lg:hidden ${
          order.offers.length > 0 ? "!border-blue-400" : ""
        }`}
      >
        <div className="oddboxinner text-center flex flex-col px-2">
          <span className="text-2xl">{order.offers.length}</span>
          <span>zgłoszeń</span>
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title">{order.title}</h2>
        <p>{order.description}</p>
        <div className="card-actions flex flex-col  lg:flex-row justify-between">
          <div className="lg:w-3/12 w-full">
            <span className="text-sm text-slate-500">
              {order.address.city}, {order.address.voivodeship}
            </span>
          </div>
          <div className="flex flex-col mb-2 lg:flex-row  justify-between lg:w-6/12 w-full">
            <span className="text-sm text-slate-500">{formattedDate}</span>
            <span className="text-sm text-slate-500">
              pozostało {order.publicationDays} dni
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
