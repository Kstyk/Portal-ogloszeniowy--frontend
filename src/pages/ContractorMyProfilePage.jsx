import React, { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const ContractorMyProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCategories, setUserCategories] = useState([]);
  const [areaOfWork, setAreaOfWork] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

  const api = useAxios();

  const fetchProfile = async () => {
    await api
      .get(`/api/account/logged-profile`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUserCategories = async () => {
    await api
      .get(`/api/category/user-categories`)
      .then((res) => {
        setUserCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAreaOfWork = async () => {
    await api
      .get(`/api/account/area-of-work`)
      .then((res) => {
        console.log(res.data);
        setAreaOfWork(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchWholeProfile = async () => {
    fetchProfile();
    fetchUserCategories();
    fetchAreaOfWork();
  };

  useEffect(() => {
    fetchWholeProfile();
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="absolute top-[6rem] left-0 right-0 h-[180px] z-0 bg-blue-400 text-white"></div>
      <div className="card shadow-xl mt-[120px] p-8 z-20 relative bg-base-100 max-md:w-full text-custom-darkgreen">
        <h1 className="text-2xl font-semibold border-b-2 border-blue-400 pb-1">
          {profile?.companyName != "" && profile?.companyName != null ? (
            profile?.companyName
          ) : (
            <>
              {profile?.firstName} {profile?.lastName}
            </>
          )}
        </h1>
        <div className="tabs tabs-boxed bg-white d-flex justify-start mt-5 pb-0 px-0 border-b-2 border-blue-400">
          <a
            className={`tab !rounded-b-none ${
              activeTab == 1 && "bg-blue-400 text-white"
            }`}
            onClick={() => setActiveTab(1)}
          >
            Informacje ogólne
          </a>
          <a
            className={`tab !rounded-b-none ${
              activeTab == 2 && "bg-blue-400 text-white"
            }`}
            onClick={() => setActiveTab(2)}
          >
            Otrzymane oceny
          </a>
          <a
            className={`tab !rounded-b-none ${
              activeTab == 3 && "bg-blue-400 text-white"
            }`}
            onClick={() => setActiveTab(3)}
          >
            Dane kontakowe
          </a>
        </div>

        {activeTab == 1 && (
          <div className="py-5 phone:pl-5 flex gap-y-6 flex-col">
            <div
              data-theme="winter"
              className="card shadow-xl pl-4 py-4 rounded-none bg-base-200"
            >
              <h3 className="font-bold border-b-[1px] mb-2 flex flex-row justify-between items-center pb-2">
                <span>Opis działalności</span>
                <Link
                  className="px-5 border-b-2 border-l-2 mr-2 border-custom-darkgreen hover:border-t-2 hover:border-r-2 hover:border-l-0 hover:border-b-0
                transition-all ease-in duration-75"
                  to="/profile/edit"
                >
                  Edytuj
                </Link>
              </h3>
              <div className="pl-4 pr-4 break-words">
                {parse("" + profile?.description + "")}
              </div>
            </div>
            <div
              data-theme="winter"
              className="card shadow-xl pl-4 py-4 rounded-none bg-base-200"
            >
              <h3 className="font-bold border-b-[1px] mb-2 flex flex-row justify-between items-center pb-2">
                <span>Obszar udzielania usług</span>
                <Link
                  className="px-5 border-b-2 border-l-2 mr-2 border-custom-darkgreen hover:border-t-2 hover:border-r-2 hover:border-l-0 hover:border-b-0
                transition-all ease-in duration-75"
                  to="/contractor/edit-area-of-work"
                >
                  Edytuj
                </Link>
              </h3>
              <p className="pl-4">
                {areaOfWork?.wholeCountry == null
                  ? areaOfWork?.voivodeship
                  : areaOfWork?.wholeCountry}
              </p>
            </div>
            <div
              data-theme="winter"
              className="card shadow-xl pl-4 py-4 rounded-none bg-base-200"
            >
              {" "}
              <h3 className="font-bold border-b-[1px] mb-2 flex flex-row justify-between items-center pb-2">
                <span>Branże</span>
                <Link
                  className="px-5 border-b-2 border-l-2 mr-2 border-custom-darkgreen hover:border-t-2 hover:border-r-2 hover:border-l-0 hover:border-b-0
                transition-all ease-in duration-75"
                  to="/contractor/edit-categories"
                >
                  Edytuj
                </Link>
              </h3>
              <ul className="pl-4 list-[square]">
                {userCategories?.map((uc) => (
                  <li key={uc.id} className="marker:text-custom-darkgreen pb-1">
                    {uc.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab == 3 && (
          <div>
            <div className="py-5 phone:pl-5 flex gap-y-6 flex-col">
              <div
                data-theme="winter"
                className="card shadow-xl px-4 py-4 rounded-none bg-base-200"
              >
                <h3 className="font-bold border-b-[1px] mb-2 flex flex-row justify-between items-center pb-2">
                  <span>Dane kontaktowe</span>
                  <Link
                    className="px-5 border-b-2 border-l-2 mr-2 border-custom-darkgreen hover:border-t-2 hover:border-r-2 hover:border-l-0 hover:border-b-0
                transition-all ease-in duration-75"
                    to="/profile/edit"
                  >
                    Edytuj
                  </Link>
                </h3>
                <div className="flex flex-row justify-start max-phone:flex-col max-phone:gap-y-5">
                  <div className="flex flex-col phone:w-6/12">
                    <h4 className="font-bold">Adres:</h4>
                    <span>Województwo {profile?.address.voivodeship},</span>
                    <span>
                      {profile?.address.city}, {profile?.address.postalCode}
                    </span>
                    <span>
                      ul. {profile?.address.street},{" "}
                      {profile?.address.buildingNumber}
                    </span>
                  </div>
                  <div className="flex flex-col phone:w-6/12">
                    <h4 className="font-bold">Kontakt:</h4>
                    <span>Numer telefonu: {profile?.phoneNumber},</span>

                    <span>Email: {profile?.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractorMyProfilePage;
