import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import voivodeships from "../components/content/VoivodeshipsWithoutPoland";
import Select from "react-select";
import useAxios from "../hooks/useAxios";
import Editor from "../components/TextEditor/Editor";
import { useForm, Controller } from "react-hook-form";
import AuthContext from "../context/AuthContext";
import LoadingComponent from "../components/LoadingComponent";

const EditOrderPage = () => {
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const nav = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState();

  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subsubCategories, setSubsubCategories] = useState([]);
  const [currentSelectedCategory, setCurrentSelectedCategory] = useState(null);
  const [backendErrors, setBackendErrors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [contentHtml, setContentHtml] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const editOrderOptions = {
    title: { required: "Tytuł zlecenia jest wymagany." },
    description: {
      required: "Opis zlecenia jest wymagany.",
    },
    publicationDays: {
      required: "Liczba dni publikacji jest wymagana.",
      min: {
        value: 5,
        message: "Minimalna liczba dni publikacji to 5.",
      },
      max: {
        value: 30,
        message: "Maksymalna liczba dni publikacji to 30.",
      },
    },
    budget: {
      required: "Określenie budżetu zlecenia jest wymagane.",
      min: {
        value: 0,
        message: "Budżet zlecenia nie może być ujemny.",
      },
    },
    voivodeship: { required: "Województwo jest wymagane" },
    city: { required: "Miasto jest wymagane." },
    postalCode: {
      required: "Kod pocztowy jest wymagany.",
      pattern: {
        value: /^[0-9]{2}-[0-9]{3}$/,
        message: "Nieprawidłowy format kodu pocztowego.",
      },
    },
    street: { required: "Ulica jest wymagana." },
    buildingNumber: { required: "Numer budynku jest wymagany." },
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
      .get(`/api/category/${cat.id}/child-categories`)
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
      .get(`/api/category/${cat.id}/child-categories`)
      .then((res) => {
        setSubsubCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data) => {
    if (contentHtml != null && contentHtml != data.description) {
      data.description = contentHtml;
    }

    data.categoryId = selectedCategory.id;
    data.voivodeship = data.voivodeship.value;

    api
      .put(`/api/order/${orderId}/edit`, data)
      .then((res) => {
        nav("/profile/my-orders?successEdit");
      })
      .catch((err) => {
        setBackendErrors(err.response.data.errors);
      });
  };

  const handleError = (errors) => {};

  const changeCategory = () => {
    setSelectedCategory(currentSelectedCategory);
  };

  const fetchEditOrder = async () => {
    setLoading(true);
    await api
      .get(`/api/order/${orderId}`)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        if (res.data.user.id != user.Id) {
          nav("/profile/my-orders");
        } else {
          setOrder(res.data);
          setValue("title", res.data.title);
          setValue("description", res.data.description);
          setValue("city", res.data.address.city);
          setValue("postalCode", res.data.address.postalCode);
          setValue("street", res.data.address.street);
          setValue("buildingNumber", res.data.address.buildingNumber);
          setValue("allowRemotely", res.data.allowRemotely);
          setValue("budget", res.data.budget);
          setSelectedCategory(res.data.category);
          setValue(
            "voivodeship",
            voivodeships.find((voi) => {
              if (voi.value == res.data.address.voivodeship) return voi;
            })
          );
        }
      })
      .catch((err) => {
        setLoading(false);

        if (err.response.status == 404) {
          nav("/profile/my-orders");
        }
      });
  };

  useEffect(() => {
    fetchMainCategories();
    fetchEditOrder();
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingComponent message="Ładowanie..." />
      ) : (
        <div>
          <div className="absolute top-[6rem] left-0 right-0 h-[180px] z-0 bg-green-400"></div>
          <div className="card shadow-xl mt-[120px] p-4 pt-8 z-20 relative bg-base-100 max-lg:w-full text-custom-darkgreen mb-10">
            <div className="flex flex-row justify-between p-2 lg:px-8 pb-0">
              <div className="w-full max-sm:w-full flex flex-col">
                <h1 className="uppercase text-2xl font-semibold pb-2 border-b-[2px] border-dotted">
                  Edytuj zlecenie{" "}
                </h1>
                <label className="block text-sm font-bold leading-6 text-custom-darkgreen mt-5">
                  Wybierz kategorię zlecenia
                </label>
                <div className="grid md:grid-cols-3 max-md:grid-cols-1 gap-2 text-sm  w-full">
                  <div className="">
                    <label className="block text-sm font-bold leading-6 text-custom-darkgreen">
                      Główna kategoria
                    </label>
                    <ul className="h-[200px] max-md:h-[150px] overflow-auto border-[1px] rounded-lg">
                      {mainCategories.map((cat) => (
                        <li
                          key={cat.id}
                          className={`hover:bg-slate-200 border-b-[1px] border-slate-200 pl-2 ${
                            cat.id == currentSelectedCategory?.id
                              ? "font-bold"
                              : ""
                          }`}
                        >
                          <span onClick={() => fetchSubCategories(cat)}>
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
                      <ul className="h-[200px] overflow-auto border-[1px] rounded-lg">
                        {subCategories.map((cat) => (
                          <li
                            key={cat.id}
                            className={`hover:bg-slate-200 border-b-[1px] border-slate-200 pl-2 ${
                              cat.id == currentSelectedCategory?.id
                                ? "font-bold"
                                : ""
                            }`}
                          >
                            <span onClick={() => fetchSubSubCategories(cat)}>
                              {cat.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <></>
                  )}
                  {subsubCategories.length > 0 ? (
                    <div>
                      <label className="block text-sm leading-6 text-custom-darkgreen font-bold">
                        Podkategoria
                      </label>
                      <ul className="h-[200px] overflow-auto border-[1px] rounded-lg">
                        {subsubCategories.map((cat) => (
                          <li
                            key={cat.id}
                            className={`hover:bg-slate-200 border-b-[1px] border-slate-200 pl-2 ${
                              cat.id == currentSelectedCategory?.id
                                ? "font-bold"
                                : ""
                            }`}
                          >
                            <span
                              onClick={() => setCurrentSelectedCategory(cat)}
                            >
                              {cat.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <></>
                  )}
                  <span className="text-[11px] text-red-400">
                    <span className="flex flex-col">
                      {backendErrors?.CategoryId &&
                        backendErrors.CategoryId.map((err) => (
                          <span key={err}>{err}</span>
                        ))}
                    </span>
                  </span>
                </div>
                <span>
                  Obecna kategoria:
                  <span className="ml-2 font-bold">
                    {selectedCategory.name}
                  </span>
                </span>
                <button
                  onClick={() => changeCategory()}
                  className="mt-2 flex w-2/12 max-xl:w-3/12 max-lg:w-4/12 max-md:w-full justify-center rounded-md bg-custom-darkgreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Zmień kategorię
                </button>

                <form onSubmit={handleSubmit(onSubmit, handleError)}>
                  <div className="sm:w-full md:flex md:flex-row md:justify-between">
                    <div className="w-full md:w-6/12">
                      <h1 className="text-lg font-semibold mt-5">
                        Szczegóły zlecenia
                      </h1>
                      <label
                        htmlFor="title"
                        className="block text-sm font-bold leading-6 text-custom-darkgreen mt-5"
                      >
                        Tytuł zlecenia
                      </label>
                      <div>
                        <input
                          id="title"
                          name="title"
                          type="text"
                          {...register("title", editOrderOptions.title)}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                        />
                      </div>
                      <span className="text-[11px] text-red-400">
                        <span>{errors.title && errors.title.message}</span>
                        <span className="flex flex-col">
                          {backendErrors?.Title &&
                            backendErrors.Title.map((err) => (
                              <span key={err}>{err}</span>
                            ))}
                        </span>
                      </span>
                      <label
                        htmlFor="description"
                        className="block text-sm font-bold leading-6 text-custom-darkgreen mt-5"
                      >
                        Opis zlecenia
                      </label>
                      <div className="mb-2 ">
                        <Editor
                          fieldValue={getValues("description")}
                          setValue={setValue}
                          setValueHtml={setContentHtml}
                          name="description"
                          id="description"
                          fieldName="description"
                          {...register(
                            "description",
                            editOrderOptions.description
                          )}
                        />

                        <span className="text-[11px] text-red-400">
                          <span>
                            {errors.description && errors.description.message}
                          </span>
                          <span className="flex flex-col">
                            {backendErrors?.Description &&
                              backendErrors.Description.map((err) => (
                                <span key={err}>{err}</span>
                              ))}
                          </span>
                        </span>
                      </div>
                      <div>
                        <div className="form-control mt-5">
                          <label className="label cursor-pointer flex justify-start gap-x-5">
                            <Controller
                              name="allowRemotely"
                              id="allowRemotely"
                              control={control}
                              render={({ field }) => (
                                <input
                                  name="allowRemotely"
                                  type="checkbox"
                                  {...register("allowRemotely")}
                                  className="checkbox checkbox-accent"
                                />
                              )}
                            />
                            <span className="label-text font-bold text-custom-darkgreen">
                              Zezwól na usługę zdalną
                            </span>
                          </label>
                        </div>
                      </div>{" "}
                      <label
                        htmlFor="budget"
                        className="block text-sm font-bold leading-6 text-custom-darkgreen mt-5"
                      >
                        Budżet zlecenia (PLN):
                      </label>
                      <input
                        id="budget"
                        name="budget"
                        type="number"
                        {...register("budget", editOrderOptions.budget)}
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                      />
                      <span className="text-[11px] text-red-400">
                        <span>{errors.budget && errors.budget.message}</span>
                        <span className="flex flex-col">
                          {backendErrors?.Budget &&
                            backendErrors.Budget.map((err) => (
                              <span key={err}>{err}</span>
                            ))}
                        </span>
                      </span>
                    </div>
                    <div className="w-full md:w-5/12">
                      <h1 className="text-lg font-semibold mt-5">
                        Adres zlecenia
                      </h1>
                      <label
                        htmlFor="voivodeship"
                        className="block text-sm leading-6 font-bold text-custom-darkgreen mt-5"
                      >
                        Województwo
                      </label>
                      <div className="mb-2">
                        <Controller
                          name="voivodeship"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Select
                              className="w-full px-0 h-10"
                              placeholder="Województwo"
                              options={voivodeships}
                              {...register(
                                "voivodeship",
                                editOrderOptions.voivodeship
                              )}
                              {...field}
                              label="Voivodeship"
                            />
                          )}
                        />
                        <span className="text-[11px] text-red-400">
                          <span>
                            {errors.voivodeship && errors.voivodeship.message}
                          </span>
                          <span className="flex flex-col">
                            {backendErrors?.Voivodeship &&
                              backendErrors.Voivodeship.map((err) => (
                                <span key={err}>{err}</span>
                              ))}
                          </span>
                        </span>
                      </div>
                      <label
                        htmlFor="city"
                        className="block text-sm leading-6 font-bold text-custom-darkgreen"
                      >
                        Miejscowość
                      </label>
                      <div className="mb-2">
                        <input
                          id="city"
                          name="city"
                          type="text"
                          {...register("city", editOrderOptions.city)}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                        />
                        <span className="text-[11px] text-red-400">
                          <span>{errors.city && errors.city.message}</span>
                          <span className="flex flex-col">
                            {backendErrors?.City &&
                              backendErrors.City.map((err) => (
                                <span key={err}>{err}</span>
                              ))}
                          </span>
                        </span>
                      </div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm leading-6 font-bold text-custom-darkgreen"
                      >
                        Kod pocztowy
                      </label>
                      <div className="mb-2">
                        <input
                          id="postalCode"
                          name="postalCode"
                          type="text"
                          {...register(
                            "postalCode",
                            editOrderOptions.postalCode
                          )}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                        />
                        <span className="text-[11px] text-red-400">
                          <span>
                            {errors.postalCode && errors.postalCode.message}
                          </span>
                          <span className="flex flex-col">
                            {backendErrors?.PostalCode &&
                              backendErrors.PostalCode.map((err) => (
                                <span key={err}>{err}</span>
                              ))}
                          </span>
                        </span>
                      </div>
                      <label
                        htmlFor="street"
                        className="block text-sm leading-6 font-bold text-custom-darkgreen"
                      >
                        Ulica
                      </label>
                      <div className="mb-2">
                        <input
                          id="street"
                          name="street"
                          type="text"
                          {...register("street", editOrderOptions.street)}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                        />
                        <span className="text-[11px] text-red-400">
                          <span>{errors.street && errors.street.message}</span>
                          <span className="flex flex-col">
                            {backendErrors?.Street &&
                              backendErrors.Street.map((err) => (
                                <span key={err}>{err}</span>
                              ))}
                          </span>
                        </span>
                      </div>
                      <label
                        htmlFor="buildingNumber"
                        className="block text-sm leading-6 font-bold text-custom-darkgreen"
                      >
                        Numer budynku
                      </label>
                      <div className="mb-2">
                        <input
                          id="buildingNumber"
                          name="buildingNumber"
                          type="text"
                          {...register(
                            "buildingNumber",
                            editOrderOptions.buildingNumber
                          )}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                        />
                        <span className="text-[11px] text-red-400">
                          <span>
                            {errors.buildingNumber &&
                              errors.buildingNumber.message}
                          </span>
                          <span className="flex flex-col">
                            {backendErrors?.BuildingNumber &&
                              backendErrors.BuildingNumber.map((err) => (
                                <span key={err}>{err}</span>
                              ))}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-5 flex w-full justify-center rounded-md bg-custom-darkgreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    Edytuj zlecenie
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditOrderPage;
