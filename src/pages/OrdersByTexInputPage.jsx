import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import useAxios from "../hooks/useAxios";
import OrderCard from "../components/OrdersListPageComponents/OrderCard";
import { Link } from "react-router-dom";
import FilterMobileByTextInput from "../components/OrdersListPageComponents/FilterMobileByTextInput";
import LoadingComponent from "../components/LoadingComponent";
import voivodeships from "../components/content/Voivodeships";
import SortOrders from "../components/OrdersListPageComponents/SortOrders";

const OrdersByTexInputPage = () => {
  const { searchByQuery } = useParams();
  const api = useAxios();

  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mainCategories, setMainCategories] = useState(null);
  const [childCategories, setChildCategories] = useState(null);
  const [subChildCategories, setSubChildCategories] = useState(null);

  const [voivodeship, setVoivodeship] = useState("");
  const [city, setCity] = useState("");
  const [searchText, setSearchText] = useState(searchByQuery);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [orders, setOrders] = useState([]);

  const [isActive, setIsActive] = useState(true);
  const [sortDirection, setSortDirection] = useState("DESC");
  const [sortBy, setSortBy] = useState("StartDate");

  const fetchMainCategories = async () => {
    await api
      .get(`/api/category/main`)
      .then((res) => {
        console.log(res.data);
        setMainCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchChildCategories = async (cat) => {
    await api
      .get(`/api/category/${cat.id}/childCategories`)
      .then((res) => {
        if (childCategories == null) {
          setChildCategories(res.data);
        } else {
          setSubChildCategories(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearCategories = () => {
    setChildCategories(null);
    setSubChildCategories(null);
    setSelectedCategory(null);
  };

  const searchOrders = async (currPage) => {
    let baseurl = "";
    if (selectedCategory != null) {
      baseurl = `/api/order/all?pageSize=10&pageNumber=${currPage}C&isActive=${isActive}&voivodeship=${voivodeship}&city=${city}&categoryId=${selectedCategory}&searchText=${searchText}`;
    } else {
      baseurl = `/api/order/all?pageSize=10&pageNumber=${currPage}&isActive=${isActive}&voivodeship=${voivodeship}&city=${city}&searchText=${searchText}`;
    }

    if (sortBy != null) {
      baseurl = baseurl + `&sortBy=${sortBy}`;
    }

    if (sortDirection != null) {
      baseurl = baseurl + `&sortDirection=${sortDirection}`;
    }

    setLoading(true);

    await api
      .get(baseurl)
      .then((res) => {
        setLoading(false);
        setOrders(res.data.items);
        setCurrentPage(res.data.pageNumber);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItemsCount);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleFirstSelectChange = (e) => {
    setChildCategories(null);
    setSubChildCategories(null);
    setSelectedCategory(e.id);
    fetchChildCategories(e);
  };

  const handleSecondSelectChange = (e) => {
    setSubChildCategories(null);
    setSelectedCategory(e.id);
    fetchChildCategories(e);
  };

  const handleThirdSelectChange = (e) => {
    setSelectedCategory(e.id);
  };

  useEffect(() => {
    searchOrders(1);
  }, [searchByQuery]);

  useEffect(() => {
    fetchMainCategories();
  }, []);

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
              defaultValue={searchByQuery}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <Link
              to={`/orders/search/${searchText.length == 0 ? "_" : searchText}`}
              className="btn btn-square h-full"
              params={{
                searchByQuery: searchText.length == 0 ? "" : searchText,
              }}
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
        <h1 className="text-2xl text-custom-darkgreen mt-10 uppercase font-bold pb-2">
          Szukaj: {searchText}
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
              <div className="selects mb-5">
                <Select
                  key={`mainCategories`}
                  className="px-0 h-10"
                  menuPortalTarget={document.body}
                  options={mainCategories}
                  value={selectedCategory == null ? null : selectedCategory.id}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  placeholder="Wszystkie kategorie"
                  onChange={(e) => handleFirstSelectChange(e)}
                />
                {childCategories != null && (
                  <Select
                    key={`childCategories`}
                    className="px-0 h-10"
                    menuPortalTarget={document.body}
                    options={childCategories}
                    value={
                      selectedCategory == null ? null : selectedCategory.id
                    }
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    placeholder="Kategoria"
                    onChange={(e) => handleSecondSelectChange(e)}
                  />
                )}
                {subChildCategories != null && (
                  <Select
                    key={`subChildCategories`}
                    className="px-0 h-10"
                    menuPortalTarget={document.body}
                    options={subChildCategories}
                    value={
                      selectedCategory == null ? null : selectedCategory.id
                    }
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    placeholder="Kategoria"
                    onChange={(e) => handleThirdSelectChange(e)}
                  />
                )}
              </div>
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
              handleSecondSelectChange,
              handleThirdSelectChange,
              selectedCategory,
              setVoivodeship,
              setCity,
              voivodeships,
              searchOrders,
              clearCategories,
              mainCategories,
              childCategories,
              subChildCategories,
            }}
          />
          <SortOrders
            data={{
              setSortBy,
              isActive: 1,
              setSortDirection,
              searchOrders,
            }}
          />
          {loading ? (
            <LoadingComponent message="Szukamy wyników..." />
          ) : (
            <div>
              <div className="flex flex-row justify-between">
                <h1 className="text-xl w-full flex justify-between items-center font-medium mt-4 pl-4 pb-2 border-b-2 border-dotted">
                  <span className="text-custom-darkgreen">Lista zleceń</span>
                  <span className="text-sm text-custom-darkgreen">
                    Znaleziono {totalItems} wyniki
                  </span>
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
                        currentPage != totalPages &&
                          searchOrders(currentPage + 1);
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
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersByTexInputPage;
