import React, { useState, useEffect } from "react";
import SearchContractors from "../components/SearchContractors";
import SearchPrincipals from "../components/SearchPrincipals";
import useAxios from "../hooks/useAxios";

const MainPage = () => {
  const [activeTab, setActiveTab] = useState("principal");
  const [mainCategories, setMainCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const api = useAxios();

  const fetchMainCategories = async () => {
    setLoading(true);

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

  useEffect(() => {
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
            <SearchContractors categories={mainCategories} loading={loading} />
          ) : (
            <SearchPrincipals categories={mainCategories} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
