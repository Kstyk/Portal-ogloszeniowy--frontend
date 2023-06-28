import React, { useState } from "react";

const MainPage = () => {
  const [activeTab, setActiveTab] = useState("principal");

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
      <div className="search-bar">
        {activeTab == "principal" ? (
          <div className="absolute left-0 right-0 h-[300px] bg-green-400 text-white">
            <div className="container w-7/12 m-auto px-5 border-x-2 border-x-white h-full py-5 ">
              <div className="headers text-center">
                <h1 className="text-3xl text-black mb-2 ">
                  Wykonawcy do usług!
                </h1>
                <h3 className=" text-black">
                  Szukasz wykonawcy? Chcesz zlecić pracę?
                </h3>
              </div>
              <div className="flex justify-between h-[50px]">
                <input
                  type="text"
                  placeholder="Szukaj wykonawcy"
                  className="input input-bordered input-accent w-full max-w-xs text-black h-full"
                />
                <div className="border-2 border-white px-2 fel text-black rounded-3xl h-full d-flex flex-col justify-center">
                  <span className="inline-block align-middle">LUB</span>
                </div>
                <button className="btn h-full">Dodaj zlecenie</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute left-0 right-0 h-[300px] bg-blue-400 text-white">
            <div className="container w-7/12 m-auto px-5 border-x-2 border-x-white h-full py-5">
              <div className="headers text-center">
                <h1 className="text-3xl text-black mb-2 ">
                  Szukaj zleceń już teraz!
                </h1>
                <h3 className=" text-black">
                  Przeglądaj zlecenia i zarabiaj dzięki zlecenia.pl
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
