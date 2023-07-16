import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";
import OfferCardWithWinnerButton from "../components/OrdersListPageComponents/OfferCardWithWinnerButton";
import Select from "react-select";

const OffersToOrderPage = () => {
  const { orderId } = useParams();
  const api = useAxios();
  const [order, setOrder] = useState();
  const [offers, setOffers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [winner, setWinner] = useState(null);

  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const fetchOrder = async (page) => {
    setLoading(true);
    await api
      .get(`/api/order/${orderId}`)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchWinner = async () => {
    await api
      .get(`/api/order/${orderId}/get-winner`)
      .then((res) => {
        console.log(res);
        if (res.status == 204) {
          setWinner(null);
        } else {
          setWinner(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchOffers = async (page) => {
    await api
      .get(`/api/order/${orderId}/offers?pageNumber=${page}&pageSize=10`)
      .then((res) => {
        setOffers(res.data.items);
        setCurrentPage(res.data.pageNumber);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItemsCount);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status == 403) {
          nav("/");
        }
      });
  };

  const setAsWinner = (id) => {
    if (
      confirm(
        "Jesteś pewny, że chcesz wybrać tę ofertę? Później już nie będziesz mógł zmienić swojej oferty!"
      )
    ) {
      api
        .put(`/api/order/${orderId}/set-winner/${id}`)
        .then((res) => {
          console.log(res);
          nav("/profile/my-orders");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    fetchOrder();
    fetchWinner();
    fetchOffers(1);
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="absolute top-[6rem] left-0 right-0 h-[180px] z-0 bg-green-400 text-white"></div>
          <div className="card shadow-xl mt-[120px] p-8 pt-0 z-20 relative bg-base-100 max-md:w-full text-custom-darkgreen">
            <div className="headers text-left relative z-10 border-b-2 border-dotted border-gray-200 overflow-auto">
              <h1 className="text-2xl mt-10 uppercase font-bold pb-2">
                Oferty do zlecenia: {order?.title}
              </h1>
            </div>
            {winner != null && (
              <>
                <div className="border-b-2 border-gray-200 pb-2 mt-5 mb-5">
                  <label className="block text-xl leading-6 font-bold">
                    Wygrana oferta
                  </label>
                </div>
                <OfferCardWithWinnerButton
                  key={winner.id}
                  offer={winner}
                  order={order}
                  setAsWinner={setAsWinner}
                />
              </>
            )}
            <div className="border-b-2 border-gray-200 pb-2 mt-5">
              <label className="block text-xl leading-6 font-bold ">
                {winner != null ? "Wszystkie oferty" : "Złożone oferty"}
              </label>
            </div>
            <div className="sort"></div>
            <div className="mt-5">
              {offers.length == 0
                ? "Brak ofert."
                : offers.map((offer) => (
                    <OfferCardWithWinnerButton
                      key={offer.id}
                      offer={offer}
                      order={order}
                      setAsWinner={setAsWinner}
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
                        currentPage != totalPages &&
                          fetchOffers(currentPage + 1);
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
        </>
      )}
    </div>
  );
};

export default OffersToOrderPage;
