import React, { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";

const ContractorMyProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userCategories, setUserCategories] = useState([]);
  const [areaOfWork, setAreaOfWork] = useState(null);

  const api = useAxios();

  const fetchProfile = async () => {
    setLoading(true);
    await api
      .get(`api/account/loggedProfile`)
      .then((res) => {
        console.log(res);
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const fetchUserCategories = async () => {
    setLoading(true);

    await api
      .get(`api/category/userCategories`)
      .then((res) => {
        console.log(res);
        setUserCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
    fetchUserCategories();
  }, []);

  return (
    <div>
      <div className="absolute top-[6rem] left-0 right-0 h-[180px] z-0 bg-blue-400 text-white"></div>
      <div className="card h-[200px] shadow-xl mt-[120px] z-20 relative bg-base-100 max-md:w-full">
        <h1></h1>
      </div>
    </div>
  );
};

export default ContractorMyProfilePage;
