import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";

const SearchPrincipals = (props) => {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <div className="absolute left-0 right-0  bg-blue-400 text-white">
        <div className="container lg:w-7/12 sm:w-full m-auto px-5 border-x-2 border-x-white h-full py-5 ">
          <div className="headers text-center">
            <h1 className="text-3xl max-phone:text-2xl text-black mb-2 ">
              Szukasz klientów?
            </h1>
            <h3 className="text-black">Zdobywaj zlecenia!</h3>
          </div>
          <div className="flex justify-between h-[80px] mt-6 border-b-2 border-dotted pb-6">
            <div className="form-control w-8/12 max-md:w-full mx-auto">
              <div className="input-group h-full w-full">
                <input
                  type="text"
                  placeholder="Szukaj zleceń"
                  className="input input-bordered h-full max-md:h-[48px] text-black w-full"
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Link
                  to={searchText.length > 0 && `/orders/search/${searchText}`}
                  className="btn btn-square h-full max-md:h-[48px]"
                  params={{ searchByQuery: searchText }}
                >
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
                </Link>
              </div>
            </div>
          </div>

          <div className="stats mt-6 flex justify-between bg-inherit h-[180px]">
            <div className="card w-[12rem] max-phone:w-1/3 bg-inherit text-neutral-content border-none">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-white max-phone:text-base">
                  1 045
                </h2>
                <p className="text-black text-xs">
                  Aktualnych zleceń ze wszystkich kategorii
                </p>
              </div>
            </div>
            <div className="card w-[12rem] max-phone:w-1/3 bg-inherit text-neutral-content border-none">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-white max-phone:text-base">
                  1,1 mln zł
                </h2>
                <p className="text-black text-xs">Wartość aktualnych zleceń</p>
              </div>
            </div>
            <div className="card w-[12rem] max-phone:w-1/3 bg-inherit text-neutral-content border-none">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-white max-phone:text-base">
                  38
                </h2>
                <p className="text-black text-xs">
                  Nowych zleceń każdego dnia!
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* main categories */}

        {props.loading ? (
          <div className="bg-white">
            <LoadingComponent message="Poczekaj, ładujemy dla Ciebie kategorie..." />
          </div>
        ) : (
          <div className="categories bg-white text-black">
            <div className="lg:w-7/12 max-phone:w-fit container m-auto px-5 py-5 max-phone:ml-[10%] grid max-phone:grid-cols-1 max-sm:grid-cols-2 grid-cols-3 gap-y-5">
              {props.categories.map((e) => (
                <Link
                  key={e.id}
                  to={`/orders/${e.id}/${e.name
                    .toLowerCase()
                    .replaceAll(",", "")
                    .replaceAll(" ", "-")}`}
                  params={{ categoryId: e.id, category: e.name }}
                  className="mb-2 text-center flex flex-row h-10 justify-start items-center gap-2 max-phone:w-fit"
                >
                  <img src={`/images/icons/${e.id}.png`} className="h-full" />
                  <span className="text-[13px]">{e.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPrincipals;
