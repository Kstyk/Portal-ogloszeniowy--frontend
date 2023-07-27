import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";
import OfferCardWithWinnerButton from "../components/OrdersListPageComponents/OfferCardWithWinnerButton";
import Select from "react-select";
import SortOffers from "../components/OrdersListPageComponents/SortOffers";
import MessageComponent from "../components/MessageComponent";

const OffersToOrderPage = () => {
  const { orderId } = useParams();
  const api = useAxios();
  const [order, setOrder] = useState();
  const [offers, setOffers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [winner, setWinner] = useState(null);

  const [sortDirection, setSortDirection] = useState("DESC");
  const [sortBy, setSortBy] = useState("PublicDate");

  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const fetchOrder = async () => {
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
    let baseurl = `/api/order/${orderId}/offers?pageNumber=${
      page != null ? page : 1
    }&pageSize=10`;

    if (sortBy != null) {
      baseurl = baseurl + `&sortBy=${sortBy}`;
    }
    if (sortDirection != null) {
      baseurl = baseurl + `&sortDirection=${sortDirection}`;
    }

    await api
      .get(baseurl)
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
          <div className="card shadow-xl mt-[120px] p-8 pt-0 z-20 relative bg-base-100 max-md:w-full text-custom-darkgreen mb-20">
            <div className="headers text-left relative z-10 border-b-2 border-dotted border-gray-200 overflow-auto">
              <h1 className="text-2xl mt-10 uppercase font-bold pb-2">
                Oferty do zlecenia: {order?.title}
              </h1>
            </div>
            {winner != null && (
              <div className="pt-5">
                <MessageComponent message="Pomyślnie dodałeś opinię wykonawcy Twojego zlecenia." />
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
                {order?.winnerOfferId == winner.id &&
                  winner?.isRated != true && (
                    <div className="mt-2">
                      <Link
                        className="btn btn-outline w-full rounded-none"
                        to={`/order/${order?.id}/offers/${winner?.id}/add-opinion`}
                        params={{
                          orderId: order?.id,
                          offerId: winner?.id,
                        }}
                      >
                        Dodaj opinię o wykonawcy wygranej oferty
                      </Link>
                    </div>
                  )}
              </div>
            )}
            <div className="border-b-2 border-gray-200 pb-2 mt-5">
              <label className="block text-xl leading-6 font-bold ">
                {winner != null ? "Wszystkie oferty" : "Złożone oferty"}
              </label>
            </div>
            <SortOffers
              data={{
                sortBy,
                setSortBy,
                sortDirection,
                setSortDirection,
                page: currentPage,
                searchOffers: fetchOffers,
              }}
            />

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
