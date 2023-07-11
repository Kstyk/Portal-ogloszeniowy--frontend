import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import LoadingComponent from "./LoadingComponent";
import { Link } from "react-router-dom";

const SearchContractors = (props) => {
  const { user } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="absolute left-0 right-0  bg-green-400 text-white">
      {console.log("loading: " + props.loading)}
      <div className="container lg:w-7/12 sm:w-full m-auto px-5 border-x-2 border-x-white h-full py-5 ">
        <div className="headers text-center">
          <h1 className="text-3xl text-black mb-2 ">Wykonawcy do usług!</h1>
          <h3 className=" text-black">
            Szukasz wykonawcy? Chcesz zlecić pracę?
          </h3>
        </div>
        <div className="flex justify-between h-[80px] mt-6 border-b-2 border-dotted pb-6 max-md:flex-col max-md:h-fit">
          {user != null && user.TypeOfAccount == "Zleceniodawca" ? (
            <>
              <div className="max-md:w-full">
                <div className="input-group h-full max-md:flex max-md:justify-center w-fit max-md:w-full">
                  <input
                    type="text"
                    placeholder="Szukaj wykonawcy"
                    className="input input-bordered h-full text-black max-md:h-[48px] max-md:w-full"
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Link
                    to={
                      searchText.length > 0 &&
                      `/contractors/search/${searchText}`
                    }
                    className="btn btn-square h-full"
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
              <div className="border-2 border-white text-black rounded-full h-full aspect-square flex items-center justify-center max-md:w-fit max-md:p-3 max-md:my-3 max-md:mx-auto">
                <div className="text-center">LUB</div>
              </div>
              <Link
                to="/order/add"
                className="btn h-full w-4/12 max-md:w-full max-md:mx-auto max-[300px]:w-full max-[300px]:mx-0"
              >
                Dodaj zlecenie
              </Link>
            </>
          ) : (
            <>
              <div className="form-control w-8/12 mx-auto">
                <div className="input-group h-full w-full ">
                  <input
                    type="text"
                    placeholder="Szukaj wykonawcy"
                    className="input input-bordered h-full w-full text-black"
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
            </>
          )}
        </div>

        <div className="stats mt-6 flex justify-between bg-inherit h-[180px]">
          <div className="card w-[12rem] bg-inherit text-neutral-content border-none">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-white">177 932</h2>
              <p className="text-black text-xs">
                Tylu wykonawców czeka na Twoje zlecenie!
              </p>
            </div>
          </div>
          <div className="card w-[12rem] bg-inherit text-neutral-content border-none">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-white">2</h2>
              <p className="text-black text-xs">
                Średnia ilość propozycji wykonania na 1 zlecenie.
              </p>
            </div>
          </div>
          <div className="card w-[12rem] bg-inherit text-neutral-content border-none">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-white">30%</h2>
              <p className="text-black text-xs">
                Tyle możesz zaoszczędzić dzięki zleceniu prac na Zlecenia.pl
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
          <div className="lg:w-7/12 sm:w-full container m-auto px-5 py-5 grid grid-cols-3 gap-10">
            {props.categories.map((e) => (
              <Link
                key={e.id}
                to={`/contractors/${e.id}/${e.name
                  .toLowerCase()
                  .replaceAll(",", "")
                  .replaceAll(" ", "-")}`}
                params={{ categoryId: e.id, category: e.name }}
                className="mb-2 text-center flex flex-row h-10 justify-start items-center gap-2"
              >
                <img
                  src={`/images/icons/${e.id}.png`}
                  alt={`icon of ${e.name}`}
                  className="h-full"
                />
                <span className="text-[13px]">{e.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchContractors;
