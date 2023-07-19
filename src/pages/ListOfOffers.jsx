import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import OfferCardContractor from "../components/ProfileComponents/OfferCardContractor";
import { useForm, Controller } from "react-hook-form";
import SortOffers from "../components/OrdersListPageComponents/SortOffers";

const ListOfOffers = () => {
  const api = useAxios();

  const [yourOffers, setYourOffers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(null);

  const [sortDirection, setSortDirection] = useState("DESC");
  const [sortBy, setSortBy] = useState("PublicDate");

  const fetchOffers = async (page) => {
    setLoading(true);

    let baseurl = `api/order/offers/all?pageSize=10&pageNumber=${page}`;

    if (sortBy != null) {
      baseurl = baseurl + `&sortBy=${sortBy}`;
    }

    if (sortDirection != null) {
      baseurl = baseurl + `&sortDirection=${sortDirection}`;
    }

    await api
      .get(baseurl)
      .then((res) => {
        setYourOffers(res.data.items);
        setCurrentPage(res.data.pageNumber);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItemsCount);
      })
      .catch((err) => console.log(err));

    setLoading(false);
  };

  const searchOffers = async (obj) => {
    setLoading(true);
    if (obj == null) obj = "";

    let baseurl = `/api/order/offers/all?pageSize=10&pageNumber=1&isActive=${obj}`;

    if (sortBy != null) {
      baseurl = baseurl + `&sortBy=${sortBy}`;
    }

    if (sortDirection != null) {
      baseurl = baseurl + `&sortDirection=${sortDirection}`;
    }

    await api
      .get(baseurl)
      .then((res) => {
        setYourOffers(res.data.items);
        setCurrentPage(res.data.pageNumber);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItemsCount);
      })
      .catch((err) => console.log(err));

    setLoading(false);
  };

  const deleteOffer = (id) => {
    if (confirm("Jesteś pewny, że chcesz usunąć tę ofertę?")) {
      api
        .delete(`/api/order/delete-offer/${id}`)
        .then(() => fetchOffers(1))
        .catch((err) => console.log(err));
    } else {
      console.log("Nie usunięto!");
    }
  };

  useEffect(() => {
    fetchOffers(1);
  }, []);

  return (
    <div>
      <div className="absolute top-[6rem] left-0 right-0 h-[180px] z-0 bg-blue-400 text-white"></div>
      <div className="card shadow-xl mt-[120px] p-8 pt-0 z-20 relative bg-base-100 max-md:w-full text-black">
        <div className="headers text-left relative z-10 border-b-2 border-dotted border-gray-200 overflow-auto">
          <h1 className="text-2xl text-custom-darkgreen mt-10 uppercase font-bold pb-2">
            Twoje złożone oferty
          </h1>
        </div>
        <SortOffers
          data={{
            sortBy,
            setSortBy,
            sortDirection,
            setSortDirection,
            page: currentPage,
            isActive,
            searchOffers: searchOffers,
          }}
        />
        <div className="ifActive border-b-2 pb-2 mb-2 text-custom-darkgreen">
          <label className="block text-xl leading-6 font-bold mt-5">
            Statusy zleceń
          </label>
          <div className="flex flex-row justify-between max-[350px]:flex-col">
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="active"
                  className="radio checked:bg-blue-500"
                  onClick={() => {
                    setIsActive(null);
                    searchOffers(null);
                  }}
                  defaultChecked={isActive == null ? true : false}
                />
                <span className="label-text ml-1 text-custom-darkgreen">
                  Wszystkie
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="active"
                  className="radio checked:bg-blue-500"
                  defaultChecked={isActive == true ? true : false}
                  onClick={() => {
                    setIsActive(true);
                    searchOffers(true);
                  }}
                />
                <span className="label-text ml-1 text-custom-darkgreen">
                  Aktywne
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="active"
                  className="radio checked:bg-blue-500"
                  defaultChecked={isActive == false ? true : false}
                  onClick={() => {
                    setIsActive(false);
                    searchOffers(false);
                  }}
                />
                <span className="label-text ml-1 text-custom-darkgreen">
                  Zakońćzone
                </span>
              </label>
            </div>
          </div>
        </div>

        {yourOffers.map((of) => (
          <OfferCardContractor
            key={of.id}
            offer={of}
            deleteOffer={deleteOffer}
            fetchOffers={fetchOffers}
            currentPage={currentPage}
          />
        ))}

        {totalItems > 0 && (
          <>
            <div
              data-theme="cupcake"
              className="join mt-10 flex flex-row justify-center w-full bg-inherit"
            >
              <button
                className={`join-item btn text-xl ${
                  currentPage - 1 == 0
                    ? "text-gray-300 cursor-default hover:bg-base-200 hover:border-base-200"
                    : ""
                }`}
                onClick={() => {
                  currentPage - 1 > 0 && fetchOffers(1);
                }}
              >
                ⇤
              </button>
              <button
                className={`join-item btn ${
                  currentPage - 1 == 0
                    ? "text-gray-300 cursor-default hover:bg-base-200 hover:border-base-200"
                    : ""
                }`}
                onClick={() => {
                  currentPage - 1 > 0 && fetchOffers(currentPage - 1);
                }}
              >
                «
              </button>
              <button className="join-item btn btn-">
                Strona {currentPage} z {totalPages}
              </button>
              <button
                className={`join-item btn ${
                  currentPage == totalPages
                    ? "text-gray-300 cursor-default hover:bg-base-200 hover:border-base-200"
                    : ""
                }`}
                onClick={() => {
                  currentPage != totalPages && fetchOffers(currentPage + 1);
                }}
              >
                »
              </button>
              <button
                className={`join-item btn text-xl ${
                  currentPage == totalPages
                    ? "text-gray-300 cursor-default hover:bg-base-200 hover:border-base-200"
                    : ""
                }`}
                onClick={() => {
                  currentPage != totalPages && fetchOffers(totalPages);
                }}
              >
                ⇥
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListOfOffers;
