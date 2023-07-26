import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import voivodeships from "../components/content/VoivodeshipsWithoutPoland";
import Select from "react-select";
import LoadingComponent from "../components/LoadingComponent";

const EditAreaOfWork = () => {
  const api = useAxios();
  const nav = useNavigate();

  const [areaOfWork, setAreaOfWork] = useState(null);
  const [voivodeship, setVoivodeship] = useState();
  const [option, setOption] = useState();
  const [loading, setLoading] = useState(true);

  const [backendErrors, setBackendErrors] = useState();

  const fetchAreaOfWork = async () => {
    setLoading(true);
    await api
      .get("/api/account/area-of-work")
      .then((res) => {
        setAreaOfWork(res.data);
        if (res.data != null) {
          if (res.data.wholeCountry != null) {
            setOption("Polska");
            console.log("pl");
          } else {
            setOption("Województwo");
            setVoivodeship(res.data.voivodeship);

            console.log("woj");
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const editAreaOfWork = () => {
    let data = {};

    if (option == "Polska") {
      data = {
        voivodeship: null,
        wholeCountry: "Polska",
      };
    }

    if (option == "Województwo") {
      data = {
        voivodeship: voivodeship,
        wholeCountry: null,
      };
    }

    api
      .put(`/api/account/area-of-work/edit`, data)
      .then((res) => {
        nav("/profile/my-profile");
      })
      .catch((err) => {
        setBackendErrors(err.response.data.errors);
      });
  };

  useEffect(() => {
    fetchAreaOfWork();
  }, []);

  return (
    <div>
      <div className="absolute top-[6rem] left-0 right-0 h-[180px] z-0 bg-blue-400 text-white"></div>
      <div className="card shadow-xl mt-[120px] p-8 z-20 relative bg-base-100 max-md:w-full text-custom-darkgreen">
        {loading ? (
          <LoadingComponent message="Ładowanie..." />
        ) : (
          <div className=" grid-cols-2 w-full gap-10">
            <h2 className="mt-2 text-2xl border-b-2 font-bold leading-9 tracking-tight text-custom-darkgreen">
              Edytuj swój obszar działania
            </h2>
            <div className="mt-5 form-control gap-y-3">
              <label className="label cursor-pointer flex justify-start">
                <input
                  type="radio"
                  name="wholeCountry"
                  id="wholeCountry"
                  checked={option == "Polska" ? true : false}
                  className="radio checked:bg-custom-darkgreen rounded-full mr-5"
                  onChange={() => {
                    setOption("Polska");
                    console.log("Polska");
                  }}
                />
                <span className="text-custom-darkgreen">W całej Polsce</span>
              </label>
              <div className="form-control flex flex-row justify-between">
                <label className="label w-6/12 cursor-pointer flex justify-start">
                  <input
                    type="radio"
                    name="voivodeship"
                    id="voivodeship"
                    checked={option == "Województwo" ? true : false}
                    className="radio checked:bg-custom-darkgreen mr-5"
                    onChange={() => {
                      setOption("Województwo");
                      console.log("Województwo");
                    }}
                  />
                  <span className="float-left text-custom-darkgreen">
                    Dane województwo
                  </span>
                </label>
                <Select
                  className="px-0 h-10 w-6/12"
                  options={voivodeships}
                  label="Voivodeship"
                  placeholder="Województwo"
                  defaultValue={voivodeships.find(
                    (voi) => voi.value == voivodeship && voi
                  )}
                  onChange={(e) => {
                    setVoivodeship(e.value);
                  }}
                />
              </div>
              <span className="text-[11px] text-red-400">
                <span className="flex flex-col">
                  {backendErrors?.Voivodeship &&
                    backendErrors.Voivodeship.map((err) => (
                      <span key={err}>{err}</span>
                    ))}
                </span>
              </span>
            </div>
            <div className="mt-10">
              <button
                type="button"
                onClick={() => editAreaOfWork()}
                className="flex w-4/12 justify-center rounded-md bg-custom-darkgreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Edytuj
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditAreaOfWork;
