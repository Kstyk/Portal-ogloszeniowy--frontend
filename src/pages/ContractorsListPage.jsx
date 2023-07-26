import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import useAxios from "../hooks/useAxios";
import LoadingComponent from "../components/LoadingComponent";
import voivodeships from "../components/content/Voivodeships";
import ContractorCard from "../components/ContractorsListPageComponents/ContractorCard";
import FilterMobile from "../components/OrdersListPageComponents/FilterMobile";

const ContractorsListPage = () => {
  const api = useAxios();
  const { categoryId, category } = useParams();

  const [loading, setLoading] = useState(false);
  const [childCategories, setChildCategories] = useState([]);
  const [subChildCategories, setSubChildCategories] = useState([]);
  const [contractors, setContractors] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [voivodeship, setVoivodeship] = useState("");
  const [city, setCity] = useState("");
  const [searchText, setSearchText] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchChildCategories = async () => {
    await api
      .get(`/api/category/${categoryId}/child-categories`)
      .then((res) => {
        setChildCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSubChildCategories = async (cat) => {
    await api
      .get(`/api/category/${cat.id}/child-categories`)
      .then((res) => {
        setSubChildCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFirstSelectChange = (e) => {
    setSubChildCategories([]);
    setSelectedSubCategory(null);
    setSelectedCategory(e.id);
    // Wyczyszczenie wartości w drugim selekcie
    // Wywołanie funkcji do pobrania nowych danych na podstawie zmienionej wartości w pierwszym selekcie
    fetchSubChildCategories(e);
  };

  const searchContractors = async (currPage) => {
    let baseurl = "";
    if (selectedSubCategory == null) {
      baseurl = `/api/contractor/all?pageSize=10&pageNumber=${currPage}&sortDirection=DESC&voivodeship=${voivodeship}&city=${city}&categoryId=${selectedCategory}&searchText=${searchText}`;
    } else {
      baseurl = `/api/contractor/all?pageSize=10&pageNumber=${currPage}&sortDirection=DESC&voivodeship=${voivodeship}&city=${city}&categoryId=${selectedSubCategory}&searchText=${searchText}`;
    }

    if (selectedSubCategory == null && selectedCategory == null) {
      baseurl = `/api/contractor/all?pageSize=10&pageNumber=${currPage}&sortDirection=DESC&voivodeship=${voivodeship}&city=${city}&categoryId=${categoryId}&searchText=${searchText}`;
    }
    setLoading(true);
    await api
      .get(baseurl)
      .then((res) => {
        setContractors(res.data.items);
        setCurrentPage(res.data.pageNumber);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItemsCount);
        console.log(res.data.items);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const fetchOrders = async () => {
    setLoading(true);

    await api
      .get(
        `/api/contractor/all?pageSize=10&pageNumber=1&sortDirection=DESC&categoryId=${categoryId}`
      )
      .then((res) => {
        setLoading(false);

        setContractors(res.data.items);
        setCurrentPage(res.data.pageNumber);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItemsCount);

        console.log(res.data.items);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchChildCategories();
    fetchOrders();
  }, []);

  return (
    <div>
      <div className="absolute top-[6rem] left-0 right-0 h-[130px] z-0 bg-green-400 text-white"></div>

      <div className="flex justify-between h-[80px] mt-[4.2rem] border-b-2 border-dotted pb-6 relative z-10">
        <div className="form-control w-full mx-auto">
          <div className="input-group h-full w-full">
            <input
              type="text"
              placeholder="Szukaj wykonawców..."
              className="input input-bordered h-full text-black w-full"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="btn btn-square h-full"
              onClick={() => searchContractors(1)}
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
            </button>
          </div>
        </div>
      </div>
      <div className="headers text-left relative z-10 border-b-2 border-dotted border-gray-200 overflow-auto">
        <h1 className="text-2xl text-custom-darkgreen mt-10 uppercase font-bold pb-2">
          {category}
        </h1>
      </div>

      <div className="grid md:grid-cols-[30%_70%] mt-5">
        <div className="max-md:hidden sticky">
          <div
            data-theme="cupcake"
            className="border collapse collapse-arrow border-base-300 rounded-none"
          >
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">Kategorie</div>
            <div className="collapse-content w-full">
              <Select
                className="px-0 h-10"
                menuPortalTarget={document.body}
                options={childCategories}
                value={selectedCategory == null ? null : selectedCategory.id}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="Kategoria"
                onChange={(e) => handleFirstSelectChange(e)}
              />
              <Select
                key={`subcategory_selec__${selectedCategory}`}
                className="px-0 h-10"
                menuPortalTarget={document.body}
                options={subChildCategories}
                value={selectedSubCategory?.id}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="Podkategoria"
                onChange={(e) => setSelectedSubCategory(e.id)}
              />
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
            onClick={() => searchContractors(1)}
          >
            Szukaj
          </button>
        </div>
        <div className="px-5">
          <FilterMobile
            datas={{
              childCategories,
              handleFirstSelectChange,
              subChildCategories,
              selectedCategory,
              setSelectedSubCategory,
              selectedSubCategory,
              setVoivodeship,
              setCity,
              voivodeships,
              searchContractors,
            }}
          />
          <div>
            {loading ? (
              <LoadingComponent message="Szukamy wyników..." />
            ) : (
              <div>
                <div className="flex flex-row justify-between">
                  <h1 className="text-xl text-custom-darkgreen w-full flex justify-between items-center font-medium mt-4 pl-4 pb-2 border-b-2 border-dotted mb-3">
                    <span>Lista wykonawców</span>
                    <span className="text-sm">
                      Znaleziono {totalItems} wyniki
                    </span>
                  </h1>
                </div>
                {contractors.map((contractor) => (
                  <ContractorCard key={contractor.id} contractor={contractor} />
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
                          currentPage - 1 > 0 && searchContractors(1);
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
                          currentPage - 1 > 0 &&
                            searchContractors(currentPage - 1);
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
                            searchContractors(currentPage + 1);
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
                          currentPage != totalPages &&
                            searchContractors(totalPages);
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
    </div>
  );
};

export default ContractorsListPage;
