import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import voivodeships from "../components/content/VoivodeshipsWithoutPoland";
import Editor from "../components/TextEditor/Editor";
import { backendUrl } from "../components/content/BackendUrl";

const RegistrationPage = () => {
  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);

  const [typeName, setTypeName] = useState(null);
  const [statusName, setStatusName] = useState(null);
  const nav = useNavigate();

  const [contentHtml, setContentHtml] = useState(null);
  const [backendErrors, setBackendErrors] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });

  const registerOptions = {
    firstName: { required: "Imię jest wymagane" },
    lastName: { required: "Nazwisko jest wymagane" },
    email: { required: "Email jest wymagany" },
    password: {
      required: "Hasło jest wymagane",
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
    statusOfUserId: { required: "Status użytkownika jest wymagany." },
    phoneNumber: { required: "Numer telefonu jest wymagany." },
    voivodeship: { required: "Województwo jest wymagane." },
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
    // description: { required: "Opis działalności jest wymagany." },
    // companyName: { required: "Nazwa firmy jest wymagana." },
    // taxIdentificationNumber: { required: "Numer NIP jest wymagany." },
  };

  const fetchStatuses = async () => {
    await axios
      .get(`${backendUrl}/api/account/statuses`)
      .then((res) => {
        setStatuses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchTypes = async () => {
    await axios
      .get(`${backendUrl}/api/account/types`)
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
    setBackendErrors([]);
    // Handle form submission
    data.voivodeship = data.voivodeship.value;

    if (data.typeOfAccountId == 1) {
      data.description = "";
    }
    if (data.statusOfUserId == 2) {
      data.taxIdentificationNumber = "";
      data.companyName = "";
    }
    if (
      data.typeOfAccountId == 2 &&
      contentHtml != null &&
      contentHtml != data.description
    ) {
      data.description = contentHtml;
    }

    console.log(data);
    axios
      .post(`${backendUrl}/api/account/register`, data)
      .then((res) => {
        console.log(res);
        nav("/login?success");
      })
      .catch((err) => {
        console.log(err);
        setBackendErrors(err.response.data.errors);
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
          Zarejestruj się
        </h2>

        <form onSubmit={handleSubmit(onSubmit, handleError)}>
          <div className="w-8/12 mx-auto max-md:w-full">
            <label className="block text-md  leading-6 font-bold text-custom-darkgreen">
              Wybierz typ konta
            </label>

            <div className=" lg:flex lg:justify-between">
              {types.map((t) =>
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
                    <h1 className="font-bold uppercase text-center text-[16px] mb-2 border-bottom border-b-2 border-dashed border-green-500 text-custom-darkgreen">
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
                    <h1 className="font-bold uppercase text-center text-[16px] mb-2 border-bottom border-b-2 border-dashed border-blue-500 text-custom-darkgreen">
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
                    <span>{errors.email && errors.email.message}</span>
                    <span className="flex flex-col">
                      {backendErrors?.Email &&
                        backendErrors.Email.map((err) => (
                          <span key={err}>{err}</span>
                        ))}
                    </span>
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
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                  />
                  <span className="text-[11px] text-red-400">
                    <span>{errors.password && errors.password.message}</span>
                    <span className="flex flex-col">
                      {backendErrors?.Password &&
                        backendErrors.Password.map((err) => (
                          <span key={err}>{err}</span>
                        ))}
                    </span>
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
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                  />
                  <span className="text-[11px] text-red-400">
                    <span>
                      {errors.confirmPassword && errors.confirmPassword.message}
                    </span>
                    <span className="flex flex-col">
                      {backendErrors?.ConfirmPassword &&
                        backendErrors.ConfirmPassword.map((err) => (
                          <span key={err}>{err}</span>
                        ))}
                    </span>
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
                          className="radio checked:bg-custom-darkgreen"
                          onClick={() => {
                            setStatusName(s.name);
                          }}
                          onChange={() => {
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
                    {...register("firstName", registerOptions.firstName)}
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
                    {...register("lastName", registerOptions.lastName)}
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
                    {...register("phoneNumber", registerOptions.phoneNumber)}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                  />
                  <span className="text-[11px] text-red-400">
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
                    {...register("city", registerOptions.city)}
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
                    {...register("postalCode", registerOptions.postalCode)}
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
                    {...register("street", registerOptions.street)}
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
                      registerOptions.buildingNumber
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
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                      />
                    </div>
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
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700  sm:text-sm sm:leading-6 outline-none"
                      />
                    </div>
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
                    <div className="mb-2 ">
                      <Editor
                        fieldValue=""
                        setValue={setValue}
                        setValueHtml={setContentHtml}
                        name="description"
                        id="description"
                        fieldName="description"
                        {...register(
                          "description",
                          registerOptions.description
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
