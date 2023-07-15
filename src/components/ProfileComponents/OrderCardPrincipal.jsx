import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const OrderCardPrincipal = ({ order, searchOrders }) => {
  const startDate = order.startDate;
  const dateObj = new Date(startDate);
  const formattedDate = dateObj.toISOString().split("T")[0];
  const dateNow = dayjs();

  const diffDates = dateNow.diff(formattedDate, "days");
  const daysLeft = order.publicationDays - diffDates;

  return (
    <div className="card-body max-lg:w-full shadow-xl text-custom-darkgreen">
      <span className="text-sm text-gray-400 flex flex-row justify-between">
        <span>Kategoria: {order.category.name}</span>
        <span>
          {order.isActive
            ? `Pozostało dni: ${daysLeft}`
            : "Zakończono zlecenie"}
        </span>
      </span>
      <Link to={`/orders/order/${order.id}`} className="card-title">
        {order.title}
      </Link>
      <span>
        Liczba ofert: <span className="font-bold">{order.offers.length}</span>
      </span>
      <div className="flex flex-row justify-start gap-x-5 gap-y-1 border-t-2 pt-3 max-md:flex-col">
        <div className="btn btn-outline w-2/12 max-md:w-8/12 max-phone:w-full rounded-none max-md:mx-auto">
          Edytuj
        </div>
        <Link
          to={`/order/${order.id}/offers`}
          className="btn btn-outline w-2/12 max-md:w-8/12 max-phone:w-full rounded-none max-md:mx-auto"
          params={{ orderId: order.id }}
        >
          Lista ofert
        </Link>
        {order.isActive && (
          <button className="btn btn-outline btn-error w-2/12 max-md:w-8/12 max-phone:w-full rounded-none max-md:mx-auto">
            Zakończ zlecenie
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCardPrincipal;
