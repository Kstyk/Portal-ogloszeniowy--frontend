import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import useAxios from "../hooks/useAxios";
import { useState } from "react";
import OrderCard from "../components/OrderCard";

const OrdersListPage = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  const { category } = location.state;
  const api = useAxios();

  const [childCategories, setChildCategories] = useState([]);
  const [subChildCategories, setSubChildCategories] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [orders, setOrders] = useState([]);

  const customStyles = {
    control: (base) => ({
      ...base,
      height: "54px",
      minHeight: "full",
      borderRadius: "none",
      borderColor: "none",
    }),
  };

  const customStyles2 = {
    control: (base) => ({
      ...base,
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
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

  const fetchChildCategories = async () => {
    await api
      .get(`/api/category/${category.id}/childCategories`)
      .then((res) => {
        setChildCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSubChildCategories = async (cat) => {
    setLoading(true);

    await api
      .get(`/api/category/${cat.id}/childCategories`)
      .then((res) => {
        console.log(res.data);
        setSubChildCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchOrders = async () => {
    console.log(selectedCategory);
    console.log(selectedSubCategory);
    let baseurl = "";
    if (selectedSubCategory == null) {
      baseurl = `/api/order/all?pageSize=10&pageNumber=1&sortDirection=ASC&isActive=true&categoryId=${selectedCategory}`;
    } else {
      baseurl = `/api/order/all?pageSize=10&pageNumber=1&sortDirection=ASC&isActive=true&categoryId=${selectedSubCategory}`;
    }

    await api
      .get(baseurl)
      .then((res) => {
        console.log(res.data.items);
        setOrders(res.data.items);
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

  const fetchOrders = async () => {
    await api
      .get(
        `/api/order/all?pageSize=10&pageNumber=1&sortDirection=ASC&isActive=true&categoryId=${category.id}`
      )
      .then((res) => {
        console.log(res.data.items);
        setOrders(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchOrders();
    fetchChildCategories();
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
            <button className="btn btn-square h-full">
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

      <div className="headers text-left relative z-10 border-b-2 border-dotted border-gray-200">
        <h1 className="text-2xl text-black mt-10 uppercase font-bold pb-2">
          {category.name}
        </h1>
      </div>
      <div className="grid grid-cols-[30%_70%] mt-5">
        <div>
          <div
            data-theme="cupcake"
            className="border collapse collapse-arrow border-base-300 rounded-none"
          >
            <input type="checkbox" />
            <div className="collapse-title  text-xl font-medium">Kategorie</div>
            <div className="collapse-content w-full">
              <Select
                className="px-0 h-10"
                menuPortalTarget={document.body}
                options={childCategories}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="Kategoria"
                styles={customStyles2}
                onChange={handleFirstSelectChange}
              />
              <Select
                key={`subcategory_selec__${selectedCategory}`}
                className="px-0 h-10"
                menuPortalTarget={document.body}
                options={subChildCategories}
                value={selectedSubCategory?.id}
                getOptionLabel={(option) =>
                  `${option.name} (${
                    orders.filter((order) => order.category.id == option.id)
                      .length
                  })`
                }
                getOptionValue={(option) => option.id}
                placeholder="Podkategoria"
                styles={customStyles2}
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
                styles={customStyles2}
              />
            </div>
          </div>
          <button
            type="submit"
            data-theme="cupcake"
            className="flex w-full justify-center  px-3 py-1.5 text-sm font-semibold leading-6 bg-base-300  shadow-sm rounded-none  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => searchOrders()}
          >
            Szukaj
          </button>
        </div>
        <div className="px-5">
          <h1 className="text-xl flex justify-between font-medium mt-4 pl-4 pb-2 border-b-2 border-dotted">
            <span>Lista zleceń</span>
            <span className="text-sm">Znaleziono {orders.length} wyniki</span>
          </h1>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersListPage;
