import React, { useState, useEffect } from "react";
import axios from "axios";

import SearchContractors from "../components/SearchContractors";
import SearchPrincipals from "../components/SearchPrincipals";

const MainPage = () => {
  const [activeTab, setActiveTab] = useState("principal");
  const [mainCategories, setMainCategories] = useState([]);

  const fetchMainCategories = async () => {
    await axios
      .get("https://localhost:7147/api/category/main")
      .then((res) => {
        setMainCategories(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchMainCategories();
  }, []);

  return (
    <div data-theme="light">
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
          <SearchContractors categories={mainCategories} />
        ) : (
          <SearchPrincipals categories={mainCategories} />
        )}
      </div>
    </div>
  );
};

export default MainPage;
