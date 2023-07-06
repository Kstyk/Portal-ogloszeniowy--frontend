import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import useAxios from "../hooks/useAxios";
import { useState } from "react";
import OrderCard from "../components/OrdersListPageComponents/OrderCard";
import FilterMobile from "../components/OrdersListPageComponents/FilterMobile";
import { Link } from "react-router-dom";
import FilterMobileByTextInput from "../components/OrdersListPageComponents/FilterMobileByTextInput";

const OrdersByTexInputPage = () => {
  const location = useLocation();
  const { searchByQuery } = location.state;
  const api = useAxios();

  const [orderResultsCategories, setOrderResultsCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [voivodeship, setVoivodeship] = useState("");
  const [city, setCity] = useState("");
  const [searchText, setSearchText] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [orders, setOrders] = useState([]);

  const customStyles = {
    control: (base) => ({
      ...base,
      height: "54px",
      minHeight: "full",
      borderRadius: "none",
      borderColor: "none",
    }),
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
  };

  const customStyles2 = {
    control: (base) => ({
      ...base,
    }),
  };

  const options = [
    { value: "zlecenia", label: "zleceń" },
    { value: "wykonawcy", label: "wykonawców" },
  ];

  const voivodeships = [
    { value: "dolnośląskie", label: "dolnośląskie" },
    { value: "kujawskoPomorskie", label: "kujawsko-pomorskie" },
    { value: "lubelskie", label: "lubelskie" },
    { value: "lubuskie", label: "lubuskie" },
    { value: "łódzkie", label: "łódzkie" },
    { value: "małopolskie", label: "małopolskie" },
    { value: "mazowieckie", label: "mazowieckie" },
    { value: "opolskie", label: "opolskie" },
    { value: "podkarpackie", label: "podkarpackie" },
    { value: "podlaskie", label: "podlaskie" },
    { value: "pomorskie", label: "pomorskie" },
    { value: "śląskie", label: "śląskie" },
    { value: "świętokrzyskie", label: "świętokrzyskie" },
    { value: "warmińskoMazurskie", label: "warmińsko-mazurskie" },
    { value: "wielkopolskie", label: "wielkopolskie" },
    { value: "zachodnioPomorskie", label: "zachodnio-pomorskie" },
  ];

  const fetchResultCategories = async () => {
    setOrderResultsCategories([]);
    await api
      .get(
        `/api/order/all?pageSize=10&pageNumber=1&sortDirection=ASC&isActive=true&searchText=${searchByQuery}`
      )
      .then((res) => {
        res.data.items.forEach((order) => {
          setOrderResultsCategories((arr) => [...arr, order.category]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearCategories = () => {
    setOrderResultsCategories([]);
    setSelectedCategory(null);
  };

  const searchOrders = async (currPage) => {
    let baseurl = "";
    if (selectedSubCategory == null) {
      baseurl = `/api/order/all?pageSize=10&pageNumber=${currPage}&sortDirection=DESC&isActive=true&voivodeship=${voivodeship}&city=${city}&categoryId=${selectedCategory}&searchText=${searchByQuery}`;
    } else {
      baseurl = `/api/order/all?pageSize=10&pageNumber=${currPage}&sortDirection=DESC&isActive=true&voivodeship=${voivodeship}&city=${city}&categoryId=${selectedSubCategory}&searchText=${searchByQuery}`;
    }

    if (selectedSubCategory == null && selectedCategory == null) {
      baseurl = `/api/order/all?pageSize=10&pageNumber=${currPage}&sortDirection=DESC&isActive=true&voivodeship=${voivodeship}&city=${city}&searchText=${searchByQuery}`;
    }
    await api
      .get(baseurl)
      .then((res) => {
        setOrders(res.data.items);
        setCurrentPage(res.data.pageNumber);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItemsCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFirstSelectChange = (e) => {
    setSelectedCategory(e.id);
  };

  useEffect(() => {
    searchOrders(1);
    fetchResultCategories();
  }, [location]);

  return (
    <div>
      <div className="absolute top-[6rem] left-0 right-0 h-[130px] z-0 bg-blue-400 text-white"></div>

      <div className="flex justify-between h-[80px] mt-[4.2rem] border-b-2 border-dotted pb-6 relative z-10">
        <div className="form-control w-full mx-auto">
          <div className="input-group h-full w-full">
            <input
              type="text"
              placeholder="Szukaj zleceń..."
              className="input input-bordered h-full text-black w-full"
              onChange={(e) => setSearchText(e.target.value)}
            />

            <Select
              className="px-0 h-10 w-6/12"
              options={options}
              placeholder="Wśród..."
              styles={customStyles}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
            <Link
              to={searchText.length > 0 && `/orders/search/${searchText}`}
              className="btn btn-square h-full"
              state={{ searchByQuery: searchText }}
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

      <div className="headers text-left relative z-10 border-b-2 border-dotted border-gray-200">
        <h1 className="text-2xl text-black mt-10 uppercase font-bold pb-2">
          Szukaj: {searchByQuery}
        </h1>
      </div>
      <div className="grid md:grid-cols-[30%_70%] mt-5">
        <div className="max-md:hidden">
          <div
            data-theme="cupcake"
            className="border collapse collapse-arrow border-base-300 rounded-none"
          >
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">Kategorie</div>
            <div className="collapse-content w-full">
              <Select
                key={`my_unique_select_key__${selectedCategory?.id}`}
                className="px-0 h-10"
                menuPortalTarget={document.body}
                options={orderResultsCategories}
                value={selectedCategory == null ? null : selectedCategory.id}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="Kategoria"
                styles={customStyles2}
                onChange={(e) => handleFirstSelectChange(e)}
              />
              <a
                data-theme="cupcake"
                className="font-semibold text-sm mt-3 cursor-pointer"
                onClick={() => clearCategories()}
              >
                Wyczyść kategorie
              </a>
            </div>
          </div>
          <div
            data-theme="cupcake"
            className="collapse collapse-arrow border border-base-300 rounded-none"
          >
            <input type="checkbox" />
            <div className="collapse-title  text-xl font-medium">
              Lokalizacja
            </div>
            <div className="collapse-content w-full">
              <Select
                className="px-0 h-10"
                menuPortalTarget={document.body}
                options={voivodeships}
                placeholder="Województwo"
                styles={customStyles2}
                onChange={(e) => setVoivodeship(e.value)}
              />
              <div className="input-group h-full w-full rounded-none">
                <input
                  data-theme=""
                  type="text"
                  placeholder="Miasto"
                  className="input input-bordered pl-2 h-10 text-black w-full bg-white focus:border-blue-500 focus:border-2 !rounded-md !outline-none"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            data-theme="cupcake"
            className="flex w-full justify-center  px-3 py-1.5 text-sm font-semibold leading-6 bg-base-300  shadow-sm rounded-none  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => searchOrders(1)}
          >
            Szukaj
          </button>
        </div>
        <div className="px-5">
          <FilterMobileByTextInput
            datas={{
              handleFirstSelectChange,
              selectedCategory,
              setVoivodeship,
              setCity,
              voivodeships,
              searchOrders,
              orderResultsCategories,
              clearCategories,
            }}
          />

          <div className="flex flex-row justify-between">
            <h1 className="text-xl w-full flex justify-between items-center font-medium mt-4 pl-4 pb-2 border-b-2 border-dotted">
              <span>Lista zleceń</span>
              <span className="text-sm">Znaleziono {totalItems} wyniki</span>
            </h1>
          </div>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}

          {totalItems > 0 && (
            <>
              <div
                data-theme="cupcake"
                className="join mt-5 flex flex-row justify-center w-full bg-inherit"
              >
                <button
                  className={`join-item btn text-xl ${
                    currentPage - 1 == 0
                      ? "text-gray-300 cursor-default hover:bg-base-200 hover:border-base-200"
                      : ""
                  }`}
                  onClick={() => {
                    currentPage - 1 > 0 && searchOrders(1);
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
                    currentPage - 1 > 0 && searchOrders(currentPage - 1);
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
                    currentPage != totalPages && searchOrders(currentPage + 1);
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
                    currentPage != totalPages && searchOrders(totalPages);
                  }}
                >
                  ⇥
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersByTexInputPage;
