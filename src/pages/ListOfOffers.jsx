import React, { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import OfferCardContractor from "../components/ProfileComponents/OfferCardContractor";

const ListOfOffers = () => {
  const api = useAxios();

  const [yourOffers, setYourOffers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const [isActive, setIsActive] = useState(null);

  const fetchOffers = async (page) => {
    setLoading(true);

    await api
      .get(
        `api/order/offers/all?pageSize=10&pageNumber=${page}&sortDirection=DESC`
      )
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

    await api
      .get(
        `api/order/offers/all?pageSize=10&pageNumber=1&sortDirection=DESC&isActive=${obj}`
      )
      .then((res) => {
        setYourOffers(res.data.items);
        setCurrentPage(res.data.pageNumber);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItemsCount);
      })
      .catch((err) => console.log(err));

    setLoading(false);
  };

  useEffect(() => {
    fetchOffers(1);
  }, []);

  return (
    <div>
      <div className="absolute top-[6rem] left-0 right-0 h-[180px] z-0 bg-blue-400 text-white"></div>
      <div className="card shadow-xl mt-[120px] p-8 pt-0 z-20 relative bg-base-100 max-md:w-full text-black">
        <div className="headers text-left relative z-10 border-b-2 border-dotted border-gray-200 overflow-auto">
          <h1 className="text-2xl text-black mt-10 uppercase font-bold pb-2">
            Twoje złożone oferty
          </h1>
        </div>

        <div className="ifActive border-b-2 pb-2 mb-2">
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
                  checked={isActive == null ? true : false}
                />
                <span className="label-text ml-1">Wszystkie</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="active"
                  className="radio checked:bg-blue-500"
                  checked={isActive ? true : false}
                  onClick={() => {
                    setIsActive(true);
                    searchOffers(true);
                  }}
                />
                <span className="label-text ml-1">Aktywne</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="active"
                  className="radio checked:bg-blue-500"
                  checked={isActive == false ? true : false}
                  onClick={() => {
                    setIsActive(false);
                    searchOffers(false);
                  }}
                />
                <span className="label-text ml-1">Zakońćzone</span>
              </label>
            </div>
          </div>
        </div>

        {yourOffers.map((of) => (
          <OfferCardContractor key={of.id} offer={of} />
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
