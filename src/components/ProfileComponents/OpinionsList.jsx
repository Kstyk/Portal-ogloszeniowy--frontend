import React from "react";
import { Link } from "react-router-dom";
import OpinionCard from "./OpinionCard";
import { useState, useEffect } from "react";
const OpinionsList = (props) => {
  const { opinions } = props;

  const sumRateTotal = opinions.reduce(
    (totalSum, opinion) => totalSum + opinion.finalRate,
    0
  );

  return (
    <div className="py-5 flex gap-y-6 flex-col">
      <div
        data-theme="winter"
        className="card shadow-xl px-4 py-4 rounded-none bg-base-200"
      >
        <h3 className="font-bold border-b-[1px] mb-2 flex flex-row justify-between items-center pb-2">
          Otrzymane oceny i komentarze
        </h3>
        <h4 className="text-right pb-2 border-b-[1px] mb-2">
          Średnia ocena ze wszystkich zleceń:{" "}
          <span className="font-bold">
            {(sumRateTotal / opinions.length).toFixed(2)}
          </span>
        </h4>
        {opinions?.map((opinion) => (
          <>
            <OpinionCard opinion={opinion} key={opinion.id} />
          </>
        ))}
      </div>
    </div>
  );
};

export default OpinionsList;
