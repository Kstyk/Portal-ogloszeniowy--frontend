import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import OfferCard from "../components/OrdersListPageComponents/OfferCard";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";
import parse from "html-react-parser";

const OrderPage = () => {
  const { orderId } = useParams();
  const api = useAxios();
  const [order, setOrder] = useState(null);
  const [daysLeft, setDaysLeft] = useState();
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ mode: "all" });

  const addOfferOptions = {
    // TODO do uzupełnienia
  };

  const fetchOrder = async () => {
    setLoading(true);
    await api
      .get(`api/order/${orderId}`)
      .then((res) => {
        setOrder(res.data);

        const startDate = res.data.startDate;
        const dateObj = new Date(startDate);
        const formattedDate = dateObj.toISOString().split("T")[0];
        const dateNow = dayjs();

        const diffDates = dateNow.diff(formattedDate, "days");
        const daysLeft = res.data.publicationDays - diffDates;

        setDaysLeft(daysLeft);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const onSubmit = (data) => {
    data.priceFor = data.priceFor.value;

    api
      .post(`api/order/${order.id}/add-offer`, data)
      .then((res) => {
        reset({ price: "", priceFor: null, content: "" });
        console.log(res);
        fetchOrder();
      })
      .catch((err) => {
        if (!formState.isSubmitSuccessful) {
          reset({ price: "", priceFor: null, content: "" });
        }
        if (err.response.status == 401) {
          nav("/login");
        } else if (err.response.status == 403) {
          alert(
            "Twoje konto jest typu 'Zleceniodawca', nie możesz składać ofert wykonania zleceń"
          );
        } else {
          alert(err.response.data.message);
          console.log(err.response);
        }
      });
  };

  const handleError = (errors) => {};

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div>
      <div className="absolute top-[6rem] left-0 right-0 h-[180px] z-0 bg-blue-400 text-white"></div>
      <div className="card shadow-xl mt-[120px] z-20 relative bg-base-100 max-md:w-full">
        {loading ? (
          <LoadingComponent message="Ładowanie..." />
        ) : (
          <div className="flex flex-row justify-between p-8 pb-0">
            <div className="w-8/12 max-sm:w-full">
              <h1 className="uppercase text-2xl font-semibold pb-2 border-b-[2px] border-dotted">
                {order?.title}
              </h1>
              <div className="flex lg:flex-row flex-col justify-between mt-5 text-lg">
                <div className="flex flex-col">
                  <span>
                    Budżet zlecenia:{" "}
                    <span className="font-semibold">
                      {order?.budget ? order.budget : "do uzgodnienia"}
                    </span>
                  </span>
                  <span>
                    Liczba zgłoszeń:{" "}
                    <span className="font-semibold">
                      {order?.offers.length}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="lg:text-right">
                    Możliwość pracy zdalnej:{" "}
                    <span className="font-semibold">
                      {order?.allowRemotely ? "TAK" : "NIE"}
                    </span>
                  </span>
                  <span className="lg:text-right">
                    Do końca:{" "}
                    <span className="font-semibold">{daysLeft} dni</span>
                  </span>
                </div>
              </div>
              <div className="mt-10 mb-10 pt-2 border-t-2 border-dotted description w-full">
                <h2 className="text-xl font-semibold mb-3">Opis zlecenia</h2>
                <div className="pl-5 pr-5">
                  {parse("" + order?.description + "")}
                </div>
              </div>

              <div className="w-full sm:hidden mt-5 border-t-2 border-dotted pt-3">
                {" "}
                <h2 className="text-xl mb-3 font-semibold">Dane kontaktowe</h2>
                <div className="text-md flex flex-col pl-5">
                  <span>
                    Imię i nazwisko: {order?.user.firstName}{" "}
                    {order?.user.lastName}
                  </span>
                  <span>Telefon: {order?.user.phoneNumber}</span>
                  {order?.user?.companyName != "" ? (
                    <span>Nazwa firmy: {order?.user.companyName}</span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mt-5 mb-5 border-b-2 border-dotted"></div>
                <h2 className="text-xl mb-3 font-semibold">Adres zlecenia</h2>
                <div className="text-[14px] flex flex-col pl-5">
                  <span>
                    Miasto: {order?.address.city}, {order?.address.postalCode}
                  </span>
                  <span>Województwo: {order?.address.voivodeship}</span>
                  <span>
                    Ulica: {order?.address.street},{" "}
                    {order?.address.buildingNumber}
                  </span>
                </div>
              </div>

              <div
                data-theme="cupcake"
                className=" shadow-xl w-full px-8 pt-5 pb-5 my-5"
              >
                <div className="collapse collapse-arrow p-0 mb-5 bg-white">
                  <input type="checkbox" />
                  <h2 className="collapse-title text-lg font-semibold">
                    Dodaj swoją ofertę do tego zlecenia{" "}
                  </h2>
                  <form
                    onSubmit={handleSubmit(onSubmit, handleError)}
                    className="collapse-content flex flex-col justify-between bg-white rounded-md shadow-xl"
                  >
                    <div className="w-6/12 ">
                      <h4 className="font-semibold">Proponuję</h4>
                    </div>

                    <div className="flex flex-row text-[15px] h-40px items-center">
                      <label htmlFor="price" className="pr-4 w-3/12">
                        Cenę:{" "}
                      </label>
                      <input
                        id="price"
                        name="price"
                        type="number"
                        {...register("price", addOfferOptions.price)}
                        required
                        className="block h-8 w-6/12 max-md:w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 outline-none"
                      />
                      <span className="pl-2 text-[12px] max-md:hidden">
                        zł brutto
                      </span>
                    </div>
                    <div className="flex flex-row text-[15px] h-40px items-center mt-5">
                      <label htmlFor="priceFor" className="pr-2 w-3/12">
                        Za:
                      </label>
                      <Controller
                        name="priceFor"
                        control={control}
                        className="!h-8 !py-0"
                        defaultValue=""
                        rules={addOfferOptions.priceFor}
                        render={({ field }) => (
                          <Select
                            className="w-6/12 max-md:w-full px-0 h-8 !focus:border-none"
                            placeholder=""
                            styles={{
                              control: (base) => ({
                                ...base,
                                paddingTop: 0,
                                paddingBottom: 0,
                              }),
                            }}
                            options={[
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
                            ]}
                            {...field}
                            label="priceFor"
                          />
                        )}
                      />
                    </div>
                    <textarea
                      id="content"
                      name="content"
                      placeholder="Wprowadź tekst oferty"
                      {...register("content", addOfferOptions.content)}
                      className="textarea  w-full block rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white focus:outline-none mt-5"
                    />
                    <button
                      type="submit"
                      data-theme="cupcake"
                      className="flex w-full justify-center  px-3 py-1.5 text-sm font-semibold leading-6 bg-base-300  shadow-sm rounded-none  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-5"
                    >
                      Proponuj
                    </button>
                  </form>
                </div>
                <div className="collapse collapse-arrow p-0 mb-5 bg-white">
                  <input type="checkbox" />
                  <h2 className="collapse-title text-lg font-semibold">
                    Oferty wykonania zlecenia
                  </h2>
                  <div className="collapse-content">
                    {order?.offers.length == 0
                      ? "Brak ofert"
                      : order?.offers.map((offer) => (
                          <div key={offer.id}>
                            <OfferCard offer={offer} />
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-3/12 max-sm:hidden">
              {" "}
              <h2 className="text-xl mb-3">Dane kontaktowe</h2>
              <div className="text-[14px] flex flex-col pl-5">
                <span>
                  Imię i nazwisko: {order?.user.firstName}{" "}
                  {order?.user.lastName}
                </span>
                <span>Telefon: {order?.user.phoneNumber}</span>
                {order?.user?.companyName != "" ? (
                  <span>Nazwa firmy: {order?.user.companyName}</span>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-5 mb-5 border-b-2 border-dotted"></div>
              <h2 className="text-xl mb-3">Adres zlecenia</h2>
              <div className="text-[14px] flex flex-col pl-5">
                <span>
                  Miasto: {order?.address.city}, {order?.address.postalCode}
                </span>
                <span>Województwo: {order?.address.voivodeship}</span>
                <span>
                  Ulica: {order?.address.street},{" "}
                  {order?.address.buildingNumber}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
