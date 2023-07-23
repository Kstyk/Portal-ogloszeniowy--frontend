import React from "react";
import "../../OrderCard.scss";
import { Link } from "react-router-dom";

const ContractorCard = ({ contractor }) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl mb-2 max-lg:flex max-lg:flex-col">
      <div className="card-body max-lg:w-full">
        <Link
          to={`/contractors/${contractor.id}`}
          params={{ contractorId: contractor.id }}
          className="card-title text-custom-darkgreen"
        >
          {contractor.firstName} {contractor.lastName}
          {contractor.companyName != "" && ` - ${contractor.companyName}`}
        </Link>

        <p className="text-custom-darkgreen">
          {contractor.description.length < 250
            ? contractor.description.replace(/(<([^>]+)>)/gi, " ")
            : contractor.description
                .replace(/(<([^>]+)>)/gi, " ")
                .substring(0, 250) + "..."}
        </p>
        <div className="flex flex-row justify-between">
          <div className="card-actions flex flex-col lg:flex-row justify-between">
            <div className="lg:w-5/12 w-full">
              <span className="text-sm text-slate-500">
                {contractor.address.city}, {contractor.address.voivodeship}
              </span>
            </div>
          </div>
          <div className="max-phone:text-sm text-custom-darkgreen">
            <span>Średnia ocena: </span>
            <span className="font-bold">
              {contractor?.averageRate ? contractor.averageRate : "Brak ocen"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorCard;
