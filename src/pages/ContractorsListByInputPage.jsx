import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router-dom";
import FilterMobileByTextInput from "../components/OrdersListPageComponents/FilterMobileByTextInput";
import LoadingComponent from "../components/LoadingComponent";
import voivodeships from "../components/content/Voivodeships";
import ContractorCard from "../components/ContractorsListPageComponents/ContractorCard";
import ContractorFilterMobileByTextInput from "../components/ContractorsListPageComponents/ContractorFilterMobileByTextInput";

const ContractorsListByInputPage = () => {
  const { searchByQuery } = useParams();
  const api = useAxios();
  const [searchText, setSearchText] = useState(searchByQuery);

  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [voivodeship, setVoivodeship] = useState("");
  const [city, setCity] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [contractors, setContractors] = useState([]);

  const [mainCategories, setMainCategories] = useState(null);
  const [childCategories, setChildCategories] = useState(null);
  const [subChildCategories, setSubChildCategories] = useState(null);

  const fetchMainCategories = async () => {
    await api
      .get(`/api/category/main`)
      .then((res) => {
        setMainCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchChildCategories = async (cat) => {
    await api
      .get(`/api/category/${cat.id}/child-categories`)
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

  const searchContractors = async (currPage) => {
    let baseurl = "";
    if (selectedCategory == null) {
      baseurl = `/api/contractor/all?pageSize=10&pageNumber=${currPage}&sortDirection=DESC&voivodeship=${voivodeship}&city=${city}&searchText=${searchText}`;
    } else {
      baseurl = `/api/contractor/all?pageSize=10&pageNumber=${currPage}&sortDirection=DESC&voivodeship=${voivodeship}&city=${city}&categoryId=${selectedCategory}&searchText=${searchText}`;
    }

    setLoading(true);

    await api
      .get(baseurl)
      .then((res) => {
        setLoading(false);
        setContractors(res.data.items);
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

  const clearCategories = () => {
    setChildCategories(null);
    setSubChildCategories(null);
    setSelectedCategory(null);
  };

  useEffect(() => {
    searchContractors(1);
  }, [searchByQuery]);

  useEffect(() => {
    fetchMainCategories();
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
              defaultValue={searchByQuery}
              className="input input-bordered h-full text-black w-full"
              onChange={(e) => setSearchText(e.target.value)}
            />

            <Link
              to={`/contractors/search/${
                searchText.length == 0 ? "_" : searchText
              }`}
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
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue ? "Brak kategorii" : "Nie znaleziono"
                  }
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
                    noOptionsMessage={({ inputValue }) =>
                      !inputValue ? "Brak podkategorii" : "Nie znaleziono"
                    }
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
                    noOptionsMessage={({ inputValue }) =>
                      !inputValue ? "Brak podkategorii" : "Nie znaleziono"
                    }
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
            onClick={() => searchContractors(1)}
          >
            Szukaj
          </button>
        </div>
        <div className="px-5">
          <ContractorFilterMobileByTextInput
            datas={{
              handleFirstSelectChange,
              handleSecondSelectChange,
              handleThirdSelectChange,
              selectedCategory,
              setVoivodeship,
              setCity,
              voivodeships,
              searchContractors,
              clearCategories,
              mainCategories,
              childCategories,
              subChildCategories,
            }}
          />
          <div>
            {loading ? (
              <LoadingComponent message="Szukamy wyników..." />
            ) : (
              <div>
                <div className="flex flex-row justify-between">
                  <h1 className="text-xl text-custom-darkgreen w-full flex justify-between items-center font-medium mt-4 pl-4 pb-2 border-b-2 border-dotted">
                    <span>Lista wykonawców</span>
                    <span className="text-sm text-custom-darkgreen">
                      Znaleziono {totalItems}{" "}
                      {(totalItems == 0 || totalItems > 4) && "wyników"}
                      {(totalItems == 2 ||
                        totalItems == 3 ||
                        totalItems == 4) &&
                        "wyniki"}
                      {totalItems == 1 && "wynik"}
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

export default ContractorsListByInputPage;
