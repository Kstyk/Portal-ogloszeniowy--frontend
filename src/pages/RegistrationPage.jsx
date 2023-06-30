import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [statuses, setStatuses] = useState([]);
  const [tpyes, setTypes] = useState([]);

  const [typeName, setTypeName] = useState(null);
  const [statusName, setStatusName] = useState(null);
  const [status, setStatus] = useState({});
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

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

  const registerOptions = {
    firstName: { required: "Imię jest wymagane" },
    lastName: { required: "Nazwisko jest wymagane" },
    email: { required: "Email jest wymagany" },
    password: {
      required: "Hasło jest wymagane",
      pattern: {
        value: /[A-Za-z]{3}/,
        message: "Niepoprawny format hasła",
      },
      minLength: {
        value: 4,
        message: "Hasło musi mieć przynajmniej 4 znaki",
      },
    },
    confirmPassword: {
      required: "Musisz powtórzyć hasło",
      validate: (val) => {
        if (watch("password") != val) {
          return "Hasła nie są identyczne";
        }
      },
    },
    statusOfUserId: { required: "Status użytkownika jest wymagany" },
    phoneNumber: { required: "Numer telefonu jest wymagany" },
    voivodeship: { required: "Województwo jest wymagane" },
    city: { required: "Miasto jest wymagane" },
    postalCode: { required: "Kod pocztowy jest wymagany" },
    street: { required: "Ulica jest wymagana" },
    buildingNumber: { required: "Numer budynku jest wymagany" },
  };

  const fetchStatuses = async () => {
    await axios
      .get("https://localhost:7147/api/account/statuses")
      .then((res) => {
        setStatuses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchTypes = async () => {
    await axios
      .get("https://localhost:7147/api/account/types")
      .then((res) => {
        setTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchStatuses();
    fetchTypes();
  }, []);

  const onSubmit = (data) => {
    // Handle form submission
    data.voivodeship = data.voivodeship.value;

    if (data.typeOfAccountId == 1) {
      data.description = "";
    }
    if (data.statusOfUserId == 2) {
      data.taxIdentificationNumber = "";
      data.companyName = "";
    }
    console.log(data);

    axios
      .post("https://localhost:7147/api/account/register", data)
      .then((res) => {
        console.log(res);
        nav("/login?success");
      })
      .catch((err) => console.log(err));
  };

  const handleError = (errors) => {};

  return (
    <div className="flex min-h-full flex-col justify-center px-6 pb-12 lg:px-8">
      <div>
        <img
          className="mx-auto h-20 w-auto"
          src="src/assets/images/logo.png"
          alt="Your Company"
        />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-custom-darkgreen">
          Zarejestruj się
        </h2>

        <form onSubmit={handleSubmit(onSubmit, handleError)}>
          <div className="w-8/12 mx-auto">
            <label className="block text-md  leading-6 font-bold text-custom-darkgreen">
              Wybierz typ konta
            </label>

            <div className=" lg:flex lg:justify-between">
              {tpyes.map((t) =>
                t.name == "Zleceniodawca" ? (
                  <div
                    key={t.id}
                    className="lg:w-[48%] w-full p-5 bg-green-400 cursor-pointer hover:bg-opacity-50 transition ease-in-out rounded-md"
                    name="typeOfAccountId"
                    onClick={() => {
                      setTypeName(t.name);
                      setValue("typeOfAccountId", t.id);
                    }}
                  >
                    <input
                      type="hidden"
                      name="typeOfAccountId"
                      value={t.id}
                      {...register(
                        "typeOfAccountId",
                        registerOptions.typeOfAccountId
                      )}
                    />
                    <h1 className="font-bold uppercase text-center text-xl mb-2 border-bottom border-b-2 border-dashed border-green-500 text-custom-darkgreen">
                      {t.name}
                    </h1>
                    <p className="text-center text-sm">
                      Będę szukać wykonawców i zlecać im pracę
                    </p>
                  </div>
                ) : (
                  <div
                    key={t.id}
                    className="lg:w-[48%] w-full p-5 bg-blue-400 cursor-pointer hover:bg-opacity-50 transition ease-in-out rounded-md"
                    onClick={() => {
                      setTypeName(t.name);
                      setValue("typeOfAccountId", t.id);
                    }}
                  >
                    <input
                      type="hidden"
                      name="typeOfAccountId"
                      value={t.id}
                      {...register(
                        "typeOfAccountId",
                        registerOptions.typeOfAccountId
                      )}
                    />
                    <h1 className="font-bold uppercase text-center text-xl mb-2 border-bottom border-b-2 border-dashed border-blue-500 text-custom-darkgreen">
                      {t.name}
                    </h1>
                    <p className="text-center text-sm">
                      Świadczę usługi, chcę zdobywać zlecenia i nowych klientów
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-5">
            {typeName != null ? (
              <>
                <label
                  htmlFor="email"
                  className="block text-sm leading-6 font-bold text-custom-darkgreen"
                >
                  Adres e-mail
                </label>
                <div className="mb-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    {...register("email", registerOptions.email)}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                  />
                  <span className="text-[11px] text-red-400">
                    {errors.email && errors.email.message}
                  </span>
                </div>
                <label
                  htmlFor="password"
                  className="block text-sm leading-6 font-bold text-custom-darkgreen"
                >
                  Hasło
                </label>
                <div className="mb-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    {...register("password", registerOptions.password)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                  />
                  <span className="text-[11px] text-red-400">
                    {errors.password && errors.password.message}
                  </span>
                </div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm leading-6 font-bold text-custom-darkgreen"
                >
                  Powtórz hasło
                </label>
                <div className="mb-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    {...register(
                      "confirmPassword",
                      registerOptions.confirmPassword
                    )}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                  />
                  <span className="text-[11px] text-red-400">
                    {errors.confirmPassword && errors.confirmPassword.message}
                  </span>
                </div>

                <div className="mt-5 mb-5 border-gray-200 border-[1px]" />

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
                          type="radio"
                          name="statusOfUserId"
                          value={s.id}
                          className="radio checked:bg-blue-500"
                          onChange={() => {
                            setStatusName(s.name);
                            setValue("statusOfUserId", s.id);
                          }}
                          {...register(
                            "statusOfUserId",
                            registerOptions.statusOfUserId
                          )}
                        />
                      </label>
                    </div>
                  </div>
                ))}
                <span className="text-[11px] text-red-400">
                  {errors.statusOfUserId && errors.statusOfUserId.message}
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
                    {...register("firstName", registerOptions.firstName)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                  />
                  <span className="text-[11px] text-red-400">
                    {errors.firstName && errors.firstName.message}
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
                    {...register("lastName", registerOptions.lastName)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                  />
                  <span className="text-[11px] text-red-400">
                    {errors.lastName && errors.lastName.message}
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
                    {...register("phoneNumber", registerOptions.phoneNumber)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                  />
                  <span className="text-[11px] text-red-400">
                    {errors.phoneNumber && errors.phoneNumber.message}
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
                    rules={registerOptions.voivodeship}
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
                    {errors.voivodeship && errors.voivodeship.message}
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
                    {...register("city", registerOptions.city)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                  />
                  <span className="text-[11px] text-red-400">
                    {errors.city && errors.city.message}
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
                    {...register("postalCode", registerOptions.postalCode)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                  />
                  <span className="text-[11px] text-red-400">
                    {errors.postalCode && errors.postalCode.message}
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
                    {...register("street", registerOptions.street)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                  />
                  <span className="text-[11px] text-red-400">
                    {errors.street && errors.street.message}
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
                      registerOptions.buildingNumber
                    )}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                  />
                  <span className="text-[11px] text-red-400">
                    {errors.buildingNumber && errors.buildingNumber.message}
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
                        {...register(
                          "companyName",
                          registerOptions.companyName
                        )}
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                      />
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
                          registerOptions.taxIdentificationNumber
                        )}
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
                {typeName == "Wykonawca" ? (
                  <>
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
                        {...register(
                          "description",
                          registerOptions.description
                        )}
                        className="textarea textarea-bordered w-full block rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6"
                      />
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
                    Zarejestruj
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;