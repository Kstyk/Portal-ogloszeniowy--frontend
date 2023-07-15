import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import OrderCardPrincipal from "../components/ProfileComponents/OrderCardPrincipal";

const ListOfMyOrders = () => {
  const api = useAxios();
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isActive, setIsActive] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (page) => {
    setLoading(true);
    await api
      .get(`api/order/logged-user/orders?pageSize=10&pageNumber=${page}`)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data.items);
        setCurrentPage(res.data.pageNumber);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItemsCount);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const searchOrders = async (obj) => {
    setLoading(true);
    let baseurl = "";
    if (obj == null) {
      obj = "";
      baseurl = `/api/order/logged-user/orders?pageSize=10&pageNumber=1&sortDirection=DESC`;
    } else {
      baseurl = `/api/order/logged-user/orders?pageSize=10&pageNumber=1&isActive=${obj}&sortDirection=DESC`;
    }
    await api
      .get(baseurl)
      .then((res) => {
        console.log(res);
        setOrders(res.data.items);
        setCurrentPage(res.data.pageNumber);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItemsCount);
      })
      .catch((err) => console.log(err));

    setLoading(false);
  };

  useEffect(() => {
    fetchOrders(1);
  }, []);

  return (
    <div>
      <div className="absolute top-[6rem] left-0 right-0 h-[180px] z-0 bg-green-400 text-white"></div>
      <div className="card shadow-xl mt-[120px] p-8 pt-0 z-20 relative bg-base-100 max-md:w-full text-custom-darkgreen">
        <div className="headers text-left relative z-10 border-b-2 border-dotted border-gray-200 overflow-auto">
          <h1 className="text-2xl mt-10 uppercase font-bold pb-2">
            Twoje zlecenia
          </h1>
        </div>
        <div className="ifActive border-b-2 pb-2 mb-2 ">
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
                    searchOrders(null);
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
                    searchOrders(true);
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
                    searchOrders(false);
                  }}
                />
                <span className="label-text ml-1 text-custom-darkgreen">
                  Zakońćzone
                </span>
              </label>
            </div>
          </div>
        </div>

        {orders.map((or) => (
          <OrderCardPrincipal
            key={or.id}
            order={or}
            // deleteOffer={deleteOffer}
            searchOrders={searchOrders}
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
                  currentPage - 1 > 0 && fetchOrders(1);
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
                  currentPage - 1 > 0 && fetchOrders(currentPage - 1);
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
                  currentPage != totalPages && fetchOrders(currentPage + 1);
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
                  currentPage != totalPages && fetchOrders(totalPages);
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

export default ListOfMyOrders;
