import React, { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Select from "react-select";
import useAxios from "../../hooks/useAxios";
import { useForm, Controller } from "react-hook-form";

const OfferCardContractor = ({ offer, deleteOffer, fetchOffers }) => {
  const startDate = offer.startDate;
  const dateObj = new Date(startDate);
  const formattedDate = dateObj.toISOString().split("T")[0];
  const dateNow = dayjs();

  const diffDates = dateNow.diff(formattedDate, "days");
  const daysLeft = offer.publicationDays - diffDates;
  const [editing, setEditing] = useState(false);
  const [backendErrors, setBackendErrors] = useState([]);
  const api = useAxios();

  const pricesFor = [
    {
      value: "całość",
      label: "całość",
    },
    {
      value: "sztuka",
      label: "sztukę",
    },
    {
      value: "godzina",
      label: "godzinę",
    },
  ];
  const addOfferOptions = {
    price: {
      required: "Szacowany koszt jest wymagany.",
    },
    priceFor: {
      required: "Określenie przedmiotu szacowanych kosztów jest wymagane.",
    },
    content: {
      required: "Określenie treści oferty jest wymagane.",
    },
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: offer.price,
      priceFor: pricesFor.find((e) => e.value == offer.priceFor),
      content: offer.content,
    },
    mode: "all",
  });

  const onSubmit = (data) => {
    console.log(data);

    data.priceFor = data.priceFor.value;

    api
      .put(`api/order/edit-offer/${offer.id}`, data)
      .then((res) => {
        setEditing(false);
        fetchOffers(1);
      })
      .catch((err) => {
        if (err.response.status == 400) {
          setBackendErrors(err.response.data.errors);
        }
      });
  };

  const handleError = (errors) => {};

  return (
    <div className="card-body max-lg:w-full shadow-xl text-custom-darkgreen">
      {offer.isWinner && (
        <div className="px-5 py-3 bg-gradient-to-l from-blue-400 to-blue-100 font-bold">
          Zwycięska oferta
        </div>
      )}
      <span className="text-sm text-gray-400 flex flex-row justify-between">
        <span>Kategoria: {offer.category.name}</span>
        <span>
          {offer.isActive
            ? `Pozostało dni: ${daysLeft}`
            : "Zakończono zlecenie"}
        </span>
      </span>
      <span>
        <span className="text-sm text-gray-400">Data dodania oferty: </span>
        <span className="text-sm text-gray-400 ">
          {dayjs(offer.publicDate).format("YYYY-MM-DD HH:mm")}
        </span>
      </span>
      <Link
        to={`/orders/order/${offer.orderId}`}
        state={{ orderId: offer.orderId }}
        className="card-title"
      >
        {offer.orderTitle}
      </Link>
      <span className="border-t-2 pt-2">
        <b>Twoja oferta:</b> {offer.content}
      </span>
      <span>
        <span className="font-bold">Szacowany koszt: </span>
        <span className="text-lg">
          {offer.price} zł za {offer.priceFor}
        </span>
      </span>

      <div className="flex flex-row justify-between gap-x-5 border-t-2 pt-3">
        {offer.isWinner ? (
          ""
        ) : (
          <>
            <div
              className="btn btn-outline w-2/12 max-md:w-4/12 max-[300px]:w-5/12 rounded-none"
              onClick={() => setEditing(!editing)}
            >
              Edytuj
            </div>

            <button
              className="btn btn-outline btn-error w-2/12 max-md:w-4/12 max-[300px]:w-5/12 rounded-none"
              onClick={() => deleteOffer(offer.id)}
            >
              Usuń
            </button>
          </>
        )}
      </div>
      {editing && (
        <div className={`edit-form w-full flex justify-center`}>
          <form
            onSubmit={handleSubmit(onSubmit, handleError)}
            className="flex flex-col justify-between w-6/12 max-xl:w-8/12 max-md:w-full mt-5 bg-white rounded-md"
          >
            <div className="flex flex-row text-[15px] h-40px items-center">
              <label htmlFor="price" className="pr-4 w-3/12">
                Cena:{" "}
              </label>
              <input
                id="price"
                name="price"
                type="number"
                {...register("price", addOfferOptions.price)}
                required
                className="block h-8 w-6/12 max-md:w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 outline-none"
              />
              <span className="pl-2 text-[12px] max-md:hidden">zł brutto</span>
            </div>
            <span className="text-[11px] text-red-400 mt-1">
              <span>{errors.price && errors.price.message}</span>
              <span className="flex flex-col">
                {backendErrors?.Price &&
                  backendErrors.Price.map((err) => (
                    <span key={err}>{err}</span>
                  ))}
              </span>
            </span>
            <div className="flex flex-row text-[15px] h-40px items-center mt-5">
              <label htmlFor="priceFor" className="pr-2 w-3/12">
                Za:
              </label>
              <Controller
                name="priceFor"
                control={control}
                className="!h-8 !py-0"
                rules={addOfferOptions.priceFor}
                render={({ field }) => (
                  <Select
                    className="w-6/12 max-md:w-full px-0 h-8 !focus:border-none"
                    name="priceFor"
                    styles={{
                      control: (base) => ({
                        ...base,
                        paddingTop: 0,
                        paddingBottom: 0,
                      }),
                    }}
                    options={pricesFor}
                    {...field}
                    label="priceFor"
                  />
                )}
              />
            </div>
            <span className="text-[11px] text-red-400 mt-1">
              <span>{errors.firstName && errors.firstName.message}</span>
              <span className="flex flex-col">
                {backendErrors?.FirstName &&
                  backendErrors.FirstName.map((err) => (
                    <span key={err}>{err}</span>
                  ))}
              </span>
            </span>
            <textarea
              id="content"
              name="content"
              placeholder="Wprowadź tekst oferty"
              {...register("content", addOfferOptions.content)}
              className="textarea  w-full block rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white focus:outline-none mt-5"
            />
            <span className="text-[11px] text-red-400 mt-1">
              <span>{errors.content && errors.content.message}</span>
              <span className="flex flex-col">
                {backendErrors?.Content &&
                  backendErrors.Content.map((err) => (
                    <span key={err}>{err}</span>
                  ))}
              </span>
            </span>
            <button
              type="submit"
              className="flex w-full btn-outline justify-center  px-3 py-1.5 text-sm font-semibold leading-6 bg-base-100 border-[1px]  shadow-sm rounded-none  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-5"
            >
              Zapisz
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default OfferCardContractor;
