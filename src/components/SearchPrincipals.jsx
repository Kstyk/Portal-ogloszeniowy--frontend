import React from "react";
import { Link } from "react-router-dom";

const SearchPrincipals = (props) => {
  return (
    <>
      <div className="absolute left-0 right-0  bg-blue-400 text-white">
        <div className="container lg:w-7/12 sm:w-full m-auto px-5 border-x-2 border-x-white h-full py-5 ">
          <div className="headers text-center">
            <h1 className="text-3xl text-black mb-2 ">Szukasz klientów?</h1>
            <h3 className=" text-black">Zdobywaj zlecenia!</h3>
          </div>
          <div className="flex justify-between h-[80px] mt-6 border-b-2 border-dotted pb-6">
            <div className="form-control w-8/12 mx-auto">
              <div className="input-group h-full w-full">
                <input
                  type="text"
                  placeholder="Szukaj zleceń"
                  className="input input-bordered h-full text-black w-full"
                />
                <button className="btn btn-square h-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="stats mt-6 flex justify-between bg-inherit h-[180px]">
            <div className="card w-[12rem] bg-inherit text-neutral-content border-none">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-white">1 045</h2>
                <p className="text-black text-xs">
                  Aktualnych zleceń ze wszystkich kategorii
                </p>
              </div>
            </div>
            <div className="card w-[12rem] bg-inherit text-neutral-content border-none">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-white">1,1 mln zł</h2>
                <p className="text-black text-xs">Wartość aktualnych zleceń</p>
              </div>
            </div>
            <div className="card w-[12rem] bg-inherit text-neutral-content border-none">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-white">38</h2>
                <p className="text-black text-xs">
                  Nowych zleceń każdego dnia!
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* main categories */}
        <div className="categories bg-white text-black">
          <div className="lg:w-7/12 sm:w-full container m-auto px-5 py-5 grid grid-cols-3 gap-10">
            {props.categories.map((e) => (
              <Link
                key={e.id}
                to={`/orders/${e.name
                  .toLowerCase()
                  .replaceAll(",", "")
                  .replaceAll(" ", "-")}`}
                state={{ category: e }}
                className="mb-2 text-center flex flex-row h-10 justify-start items-center gap-2"
              >
                <img
                  src={`src/assets/images/icons/${e.id}.png`}
                  alt={`icon of ${e.name}`}
                  className="h-full"
                />
                <span className="text-[13px]">{e.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPrincipals;
