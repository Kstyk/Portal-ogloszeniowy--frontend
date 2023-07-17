import React, { useState, useEffect } from "react";
import Select from "react-select";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const EditContractorCategories = () => {
  const api = useAxios();
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subsubCategories, setSubsubCategories] = useState([]);
  const [currentSelectedCategory, setCurrentSelectedCategory] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([]);
  const [error, setError] = useState(null);

  const [currentCategories, setCurrentCategories] = useState([]);

  const nav = useNavigate();

  const fetchCurrentCategories = async () => {
    await api
      .get("/api/category/userCategories")
      .then((res) => {
        setCurrentCategories(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchMainCategories = async () => {
    await api
      .get("/api/category/main")
      .then((res) => {
        setMainCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSubCategories = async (cat) => {
    setSubsubCategories([]);
    setCurrentSelectedCategory(cat);
    await api
      .get(`/api/category/${cat.id}/childCategories`)
      .then((res) => {
        setSubCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSubSubCategories = async (cat) => {
    setCurrentSelectedCategory(cat);
    await api
      .get(`/api/category/${cat.id}/childCategories`)
      .then((res) => {
        setSubsubCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToListCategory = () => {
    if (
      selectedCategories.some((item) => item.id == currentSelectedCategory.id)
    ) {
      console.log("Ta kategoria już znajduje się w liście");
      setError("Ta kategoria już znajduje się w liście");
      setCurrentSelectedCategory(null);
    } else {
      setSelectedCategoriesIds((current) => [
        ...current,
        currentSelectedCategory.id,
      ]);
      setSelectedCategories((current) => [...current, currentSelectedCategory]);
      setCurrentSelectedCategory(null);
    }
  };

  useEffect(() => {
    fetchCurrentCategories();
    fetchMainCategories();
  }, []);

  const removeCategory = (e) => {
    setSelectedCategories((selectedCategories) =>
      selectedCategories.filter((data) => data.id != e.id)
    );

    setSelectedCategoriesIds((selectedCategoriesIds) =>
      selectedCategoriesIds.filter((data) => data != e.id)
    );

    console.log(e);
  };

  const deleteCategory = (e) => {
    if (confirm("Jesteś pewny, że chcesz usunąć tą kategorię?")) {
      api
        .delete(`/api/category/delete/${e.id}`)
        .then((res) => {
          fetchCurrentCategories();
        })
        .catch((err) => console.log(err));
    } else {
      // Do nothing!
      console.log("Nie usunięto.");
    }
  };

  const submitForm = () => {
    if (selectedCategoriesIds.length == 0) {
      setError("Nie wybrałeś żadnych kategorii.");
      return;
    }

    let data = {};
    data = {
      categories: selectedCategoriesIds,
    };

    api
      .post("/api/category/user/add", data)
      .then((res) => {
        console.log(res);
        fetchCurrentCategories();
        setSelectedCategories([]);
        setSelectedCategoriesIds([]);
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div className="max-phone:mx-2">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-custom-darkgreen">
        Wykonawco!
      </h2>
      <h2 className="mt-2 mb-5 text-center text-md font-bold leading-9 tracking-tight text-custom-darkgreen">
        Tutaj możesz dodać lub usunąć wcześniej wybrane kategorie.
      </h2>
      <div className="grid grid-cols-1 w-full gap-10">
        <h2 className="mt-5 border-b-2 text-custom-darkgreen">
          Obecne kategorie
        </h2>
      </div>
      <ul className="w-full mb-6 mt-2">
        {currentCategories.map((e) => (
          <div key={e.id} className="w-full text-sm breadcrumbs pb-0">
            <ul className="gap-0 text-custom-darkgreen">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  onClick={() => deleteCategory(e)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </li>
              {e?.parentCategory?.parentCategory != null ? (
                <li>
                  <a>{e.parentCategory.parentCategory.name}</a>
                </li>
              ) : (
                ""
              )}
              {e?.parentCategory != null ? (
                <li>
                  <a>{e.parentCategory.name}</a>
                </li>
              ) : (
                ""
              )}
              <li className="font-semibold">{e.name}</li>
            </ul>
          </div>
        ))}
      </ul>
      <div className="grid md:grid-cols-3 max-md:grid-cols-1 gap-2 text-sm  w-full">
        <div>
          <label className="block text-sm font-bold leading-6 text-custom-darkgreen">
            Główna kategoria
          </label>
          <ul className="h-[200px] max-md:h-[150px] overflow-auto border-[1px] rounded-lg">
            {mainCategories.map((cat) => (
              <li
                key={cat.id}
                className={`hover:bg-slate-200 pl-2 border-b-[1px] ${
                  cat.id == currentSelectedCategory?.id ? "font-bold" : ""
                }`}
              >
                <span
                  className="text-custom-darkgreen"
                  onClick={() => fetchSubCategories(cat)}
                >
                  {cat.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {subCategories.length > 0 ? (
          <div>
            <label className="block text-sm font-bold leading-6 text-custom-darkgreen">
              Podkategoria
            </label>
            <ul className="h-[200px] max-md:h-[150px] overflow-auto border-[1px] rounded-lg">
              {subCategories.map((cat) => (
                <li
                  key={cat.id}
                  className={`hover:bg-slate-200 pl-2 border-b-[1px] ${
                    cat.id == currentSelectedCategory?.id ? "font-bold" : ""
                  }`}
                >
                  <span
                    className="text-custom-darkgreen"
                    onClick={() => fetchSubSubCategories(cat)}
                  >
                    {cat.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
        {subsubCategories.length > 0 ? (
          <div>
            <label className="block text-sm font-bold leading-6 text-custom-darkgreen">
              Podkategoria
            </label>
            <ul className="h-[200px] max-md:h-[150px] overflow-auto border-[1px] rounded-lg">
              {subsubCategories.map((cat) => (
                <li
                  key={cat.id}
                  className={`hover:bg-slate-200 pl-2 border-b-[1px] ${
                    cat.id == currentSelectedCategory?.id ? "font-bold" : ""
                  }`}
                >
                  <span
                    className="text-custom-darkgreen"
                    onClick={() => setCurrentSelectedCategory(cat)}
                  >
                    {cat.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      {error != null ? (
        <div className="alert alert-error mt-5 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => setError(null)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <span className="text-[12px] ">{error}</span>
        </div>
      ) : (
        ""
      )}
      <div className="grid grid-cols-2 w-full gap-10">
        <h2 className="mt-5 border-b-2 text-custom-darkgreen">
          Wybrane kategorie
        </h2>
        <button
          type="submit"
          className="flex  mt-5 w-full justify-center rounded-md bg-custom-darkgreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          onClick={() => addToListCategory()}
        >
          Dodaj kategorię
        </button>
      </div>
      <ul>
        {selectedCategories.map((e) => (
          <div key={e.id} className="text-sm breadcrumbs pb-0">
            <ul className="gap-0 text-custom-darkgreen">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  onClick={() => removeCategory(e)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </li>
              {e?.parentCategory?.parentCategory != null ? (
                <li>
                  <a>{e.parentCategory.parentCategory.name}</a>
                </li>
              ) : (
                ""
              )}
              {e?.parentCategory != null ? (
                <li>
                  <a>{e.parentCategory.name}</a>
                </li>
              ) : (
                ""
              )}
              <li className="font-semibold">{e.name}</li>
            </ul>
          </div>
        ))}
      </ul>

      <div className="mt-5 mb-5">
        <button
          type="submit"
          onClick={submitForm}
          className="flex w-full justify-center rounded-md bg-custom-darkgreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Zapisz konfigurację
        </button>
      </div>
    </div>
  );
};

export default EditContractorCategories;
