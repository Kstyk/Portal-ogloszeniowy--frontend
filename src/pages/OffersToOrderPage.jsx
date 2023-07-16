import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";
import OfferCardWithWinnerButton from "../components/OrdersListPageComponents/OfferCardWithWinnerButton";

const OffersToOrderPage = () => {
  const { orderId } = useParams();
  const api = useAxios();
  const [order, setOrder] = useState();
  const [offers, setOffers] = useState([]);
  const [winner, setWinner] = useState(null);

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

  const fetchOffers = async () => {
    await api
      .get(`/api/order/${orderId}/offers`)
      .then((res) => {
        setOffers(res.data);
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
    fetchOffers();
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
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OffersToOrderPage;
