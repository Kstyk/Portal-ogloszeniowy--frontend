import React from "react";
import "../../OrderCard.scss";
import { Link } from "react-router-dom";
import { selectedVoivodeship } from "../content/VoivodeshipsWithoutPoland";

const ContractorCard = ({ contractor }) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl mb-2 max-lg:flex max-lg:flex-col hover:bg-slate-50 duration-200">
      <div className="card-body max-lg:w-full">
        <Link
          to={`/contractors/${contractor.id}`}
          params={{ contractorId: contractor.id }}
          className="card-title text-custom-darkgreen"
        >
          {contractor.firstName} {contractor.lastName}
          {contractor?.companyName != "" && contractor?.companyName != null
            ? ` - ${contractor?.companyName}`
            : ""}
        </Link>

        <span className="text-custom-darkgreen break-all w-full">
          {contractor.description.length < 250
            ? contractor.description.replace(/(<([^>]+)>)/gi, " ")
            : contractor.description
                .replace(/(<([^>]+)>)/gi, " ")
                .substring(0, 250) + "..."}
        </span>
        <hr />
        <div className="flex flex-row justify-between">
          <div className="card-actions flex flex-col lg:flex-row justify-between">
            <div className="lg:w-5/12 w-full">
              <span className="text-sm text-slate-500">
                {contractor.address.city},{" "}
                {selectedVoivodeship(contractor.address.voivodeship)}
              </span>
            </div>
          </div>
          <div className="max-phone:text-sm text-custom-darkgreen">
            <span>Średnia ocena: </span>
            <span className="font-bold">
              {contractor?.averageRate
                ? contractor.averageRate + " (" + contractor.countOpinions + ")"
                : "Brak ocen"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorCard;
