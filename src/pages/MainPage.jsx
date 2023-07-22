import React, { useState, useEffect } from "react";
import SearchContractors from "../components/SearchContractors";
import SearchPrincipals from "../components/SearchPrincipals";
import useAxios from "../hooks/useAxios";

const MainPage = () => {
  const [activeTab, setActiveTab] = useState("principal");
  const [mainCategories, setMainCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statistic, setStatistic] = useState(null);
  const api = useAxios();

  const fetchMainCategories = async () => {
    await api
      .get("/api/category/main")
      .then((res) => {
        setMainCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const fetchStatistics = async () => {
    setLoading(true);

    await api
      .get("api/order/statistics")
      .then((res) => {
        setStatistic(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    fetchStatistics();
    fetchMainCategories();
  }, []);

  return (
    <div data-theme="light">
      <div>
        <div className="tabs tabs-boxed bg-white d-flex justify-end pb-0 pr-0">
          <a
            className={`tab !rounded-b-none mb-0 ${
              activeTab == "principal" ? "bg-green-500 text-white" : ""
            }`}
            onClick={() => setActiveTab("principal")}
          >
            Dla zlecających
          </a>
          <a
            className={`tab !rounded-b-none ${
              activeTab == "contractor" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setActiveTab("contractor")}
          >
            Dla wykonawców
          </a>
        </div>
        <div className="search-bar h-[400px]">
          {activeTab == "principal" ? (
            <SearchContractors
              categories={mainCategories}
              loading={loading}
              statistic={statistic}
            />
          ) : (
            <SearchPrincipals
              categories={mainCategories}
              loading={loading}
              statistic={statistic}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
