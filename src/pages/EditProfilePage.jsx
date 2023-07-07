import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const [statuses, setStatuses] = useState([]);
  const [statusName, setStatusName] = useState(null);
  const [backendErrors, setBackendErrors] = useState([]);
  const location = useLocation();
  const { profile } = location.state;
  const api = useAxios();
  const nav = useNavigate();

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

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      statusOfUserId: profile.statusOfUser.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      phoneNumber: profile.phoneNumber,
      voivodeship: voivodeships.find(
        (e) => e.value == profile.address.voivodeship
      ),
      city: profile.address.city,
      postalCode: profile.address.postalCode,
      street: profile.address.street,
      buildingNumber: profile.address.buildingNumber,
      description: profile.description,
      taxIdentificationNumber: profile.taxIdentificationNumber,
      companyName: profile.companyName,
    },
  });

  const editUserOptions = {
    firstName: { required: "Imię jest wymagane." },
    lastName: { required: "Nazwisko jest wymagane." },
    statusOfUserId: { required: "Status użytkownika jest wymagany." },
    phoneNumber: { required: "Numer telefonu jest wymagany." },
    voivodeship: { required: "Województwo jest wymagane." },
    city: { required: "Miasto jest wymagane." },
    postalCode: { required: "Kod pocztowy jest wymagany." },
    street: { required: "Ulica jest wymagana." },
    buildingNumber: { required: "Numer budynku jest wymagany." },
    description: { required: "Opis działalności jest wymagany." },
    companyName: { required: "Nazwa firmy jest wymagana." },
    taxIdentificationNumber: { required: "Numer NIP jest wymagany." },
  };

  const fetchStatuses = async () => {
    setBackendErrors([]);
    await api
      .get("/api/account/statuses")
      .then((res) => {
        setStatuses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  const onSubmit = (data) => {
    data.voivodeship = data.voivodeship.value;

    api
      .put("/api/account/edit", data)
      .then((res) => {
        nav("/profile/my-profile");
      })
      .catch((err) => {
        setBackendErrors(err.response.data.errors);
        console.log(err.response.data.errors);
      });
  };

  const handleError = (errors) => {};

  return (
    <div className="flex min-h-full flex-col justify-center px-6 pb-12 lg:px-8">
      <div>
        <img
          className="mx-auto h-20 w-auto"
          src="/images/logo.png"
          alt="Your Company"
        />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-custom-darkgreen">
          Edytuj swój profil
        </h2>

        <form onSubmit={handleSubmit(onSubmit, handleError)}>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-5">
            <>
              <label
                htmlFor="confirmPassword"
                className="block text-sm leading-6 font-bold text-custom-darkgreen"
              >
                Status
              </label>

              {statuses.map((s) => (
                <div key={s.id}>
                  <div className="form-control w-100">
                    <label className="label cursor-pointer">
                      <span className="label-text">{s.name}</span>
                      <input
                        {...register("statusOfUserId")}
                        id="statusOfUserId"
                        type="radio"
                        className="radio checked:bg-custom-darkgreen"
                        value={`${s.id}`}
                        onClick={() => setStatusName(s.name)}
                        defaultChecked={getValues("statusOfUserId") == s.id}
                      />
                    </label>
                  </div>
                </div>
              ))}

              <span className="text-[11px] text-red-400">
                <span>
                  {errors.statusOfUserId && errors.statusOfUserId.message}
                </span>
                <span className="flex flex-col">
                  {backendErrors?.StatusOfUserId &&
                    backendErrors.StatusOfUserId.map((err) => (
                      <span key={err}>{err}</span>
                    ))}
                </span>
              </span>

              <label
                htmlFor="firstName"
                className="block text-sm leading-6 font-bold text-custom-darkgreen"
              >
                Imię
              </label>
              <div className="mb-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  {...register("firstName", editUserOptions.firstName)}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                />
                <span className="text-[11px] text-red-400">
                  <span>{errors.firstName && errors.firstName.message}</span>
                  <span className="flex flex-col">
                    {backendErrors?.FirstName &&
                      backendErrors.FirstName.map((err) => (
                        <span key={err}>{err}</span>
                      ))}
                  </span>
                </span>
              </div>
              <label
                htmlFor="lastName"
                className="block text-sm leading-6 font-bold text-custom-darkgreen"
              >
                Nazwisko
              </label>
              <div className="mb-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  {...register("lastName", editUserOptions.lastName)}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                />
                <span className="text-[11px] text-red-400">
                  <span>{errors.lastName && errors.lastName.message}</span>
                  <span className="flex flex-col">
                    {backendErrors?.LastName &&
                      backendErrors.LastName.map((err) => (
                        <span key={err}>{err}</span>
                      ))}
                  </span>
                </span>
              </div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm leading-6 font-bold text-custom-darkgreen"
              >
                Telefon
              </label>
              <div className="mb-2">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  {...register("phoneNumber", editUserOptions.phoneNumber)}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                />
                <span className="text-[11px] text-red-400 flex flex-col">
                  <span>
                    {errors.phoneNumber && errors.phoneNumber.message}
                  </span>
                  <span className="flex flex-col">
                    {backendErrors?.PhoneNumber &&
                      backendErrors.PhoneNumber.map((err) => (
                        <span key={err}>{err}</span>
                      ))}
                  </span>
                </span>
              </div>
              <label
                htmlFor="voivodeship"
                className="block text-sm leading-6 font-bold text-custom-darkgreen"
              >
                Województwo
              </label>
              <div className="mb-2">
                <Controller
                  name="voivodeship"
                  control={control}
                  defaultValue=""
                  rules={editUserOptions.voivodeship}
                  render={({ field }) => (
                    <Select
                      className="w-full px-0 h-10"
                      options={voivodeships}
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
                  {...register("city", editUserOptions.city)}
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
                  {...register("postalCode", editUserOptions.postalCode)}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                />
                <span className="text-[11px] text-red-400">
                  <span>{errors.postalCode && errors.postalCode.message}</span>
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
                  {...register("street", editUserOptions.street)}
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
                    editUserOptions.buildingNumber
                  )}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                />
                <span className="text-[11px] text-red-400">
                  <span>
                    {errors.buildingNumber && errors.buildingNumber.message}
                  </span>
                  <span className="flex flex-col">
                    {backendErrors?.BuildingNumber &&
                      backendErrors.BuildingNumber.map((err) => (
                        <span key={err}>{err}</span>
                      ))}
                  </span>
                </span>
              </div>
              <label
                htmlFor="description"
                className="block text-sm leading-6 font-bold text-custom-darkgreen"
              >
                Opis działalności
              </label>
              <div className="mb-2">
                <textarea
                  id="description"
                  name="description"
                  {...register("description", editUserOptions.description)}
                  className="textarea textarea-bordered w-full block rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6"
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
              {statusName == "Firma" ? (
                <>
                  <label
                    htmlFor="companyName"
                    className="block text-sm leading-6 font-bold text-custom-darkgreen"
                  >
                    Nazwa firmy
                  </label>
                  <div className="mb-2">
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      {...register("companyName", editUserOptions.companyName)}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                    />
                    <span className="text-[11px] text-red-400">
                      <span>
                        {errors.companyName && errors.companyName.message}
                      </span>
                      <span className="flex flex-col">
                        {backendErrors?.CompanyName &&
                          backendErrors.CompanyName.map((err) => (
                            <span key={err}>{err}</span>
                          ))}
                      </span>
                    </span>
                  </div>
                  <label
                    htmlFor="taxIdentificationNumber"
                    className="block text-sm leading-6 font-bold text-custom-darkgreen"
                  >
                    NIP
                  </label>
                  <div className="mb-2">
                    <input
                      id="taxIdentificationNumber"
                      name="taxIdentificationNumber"
                      type="text"
                      {...register(
                        "taxIdentificationNumber",
                        editUserOptions.taxIdentificationNumber
                      )}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                    />
                    <span className="text-[11px] text-red-400">
                      <span>
                        {errors.taxIdentificationNumber &&
                          errors.taxIdentificationNumber.message}
                      </span>
                      <span className="flex flex-col">
                        {backendErrors?.TaxIdentificationNumber &&
                          backendErrors.TaxIdentificationNumber.map((err) => (
                            <span key={err}>{err}</span>
                          ))}
                      </span>
                    </span>
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="mt-2">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-custom-darkgreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Edytuj
                </button>
              </div>
            </>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
