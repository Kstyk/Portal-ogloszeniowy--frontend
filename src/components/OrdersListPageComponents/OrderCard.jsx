import React from "react";
import "../../OrderCard.css";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  const startDate = order.startDate;
  const dateObj = new Date(startDate);
  const formattedDate = dateObj.toISOString().split("T")[0];
  const dateNow = dayjs();

  const diffDates = dateNow.diff(formattedDate, "days");
  const daysLeft = order.publicationDays - diffDates;

  return (
    <div className="card card-side bg-base-100 shadow-xl mb-2 max-lg:flex max-lg:flex-col">
      <div
        className={`box w-2/12 my-5 lg:ml-3 flex justify-center items-center px-2 max-lg:hidden max-xl:w-3/12 ${
          order.offers.length > 0 ? "!border-blue-400" : ""
        }`}
      >
        <div className="oddboxinner text-center flex flex-col px-2">
          <span className="text-xl">{order.offers.length}</span>
          <span className="text-sm">zgłoszeń</span>
        </div>
      </div>
      <div className="card-body max-lg:w-full">
        <span className="text-sm text-gray-400">
          Kategoria: {order.category.name}
        </span>
        <Link
          to={`/orders/order/${order.id}`}
          params={{ orderId: order.id }}
          className="card-title"
        >
          {order.title}
        </Link>
        <div
          className={`w-full lg:hidden flex flex-start pl-8 py-3 border-y-2 ${
            order.offers.length > 0 ? "!border-blue-400" : ""
          }
        `}
        >
          <span>{order.offers.length} zgłoszeń</span>
        </div>
        <p>
          {order.description.length < 150
            ? order.description
            : order.description.substring(0, 150) + "..."}
        </p>
        <div className="card-actions flex flex-col lg:flex-row justify-between">
          <div className="lg:w-3/12 w-full">
            <span className="text-sm text-slate-500">
              {order.address.city}, {order.address.voivodeship}
            </span>
          </div>
          <div className="flex flex-col mb-2 xl:flex-row  justify-between lg:w-6/12 w-full">
            <span className="text-sm text-slate-500">{formattedDate}</span>
            <span className="text-sm text-slate-500">
              pozostało {daysLeft} dni
            </span>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default OrderCard;
