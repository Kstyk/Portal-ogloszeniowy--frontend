import React from "react";
import Select from "react-select";

const ContractorFilterMobileByTextInput = (props) => {
  const {
    handleFirstSelectChange,
    selectedCategory,
    setVoivodeship,
    setCity,
    voivodeships,
    searchContractors,
    contractorsCategories,
    clearCategories,
  } = props.datas;
  return (
    <div
      data-theme="cupcake"
      className="collapse collapse-arrow border border-base-300 rounded-none md:hidden w-full"
    >
      <input type="checkbox" />
      <div className="collapse-title  text-xl font-medium">Filtruj</div>
      <div className="collapse-content">
        <div
          data-theme="cupcake"
          className="border collapse collapse-arrow border-base-300 rounded-none"
        >
          <input type="checkbox" />
          <div className="collapse-title  text-xl font-medium">Kategorie</div>
          <div className="collapse-content w-full">
            <Select
              key={`my_unique_select_key__${selectedCategory?.categoryId}`}
              className="px-0 h-10"
              menuPortalTarget={document.body}
              options={contractorsCategories}
              value={
                selectedCategory == null ? null : selectedCategory.categoryId
              }
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.categoryId}
              placeholder="Kategoria"
              onChange={(e) => handleFirstSelectChange(e)}
            />
            <a
              data-theme="cupcake"
              className="font-semibold text-sm mt-3 cursor-pointer"
              onClick={() => clearCategories()}
            >
              Wyczyść kategorie
            </a>
          </div>
        </div>
        <div
          data-theme="cupcake"
          className="collapse collapse-arrow border border-base-300 rounded-none"
        >
          <input type="checkbox" />
          <div className="collapse-title  text-xl font-medium">Lokalizacja</div>
          <div className="collapse-content w-full">
            <Select
              className="px-0 h-10"
              menuPortalTarget={document.body}
              options={voivodeships}
              placeholder="Województwo"
              onChange={(e) => setVoivodeship(e.value)}
            />
            <div className="input-group h-full w-full rounded-none">
              <input
                data-theme=""
                type="text"
                placeholder="Miasto"
                className="input input-bordered pl-2 h-10 text-black w-full bg-white focus:border-blue-500 focus:border-2 !rounded-md !outline-none"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          data-theme="cupcake"
          className="flex w-full justify-center  px-3 py-1.5 text-sm font-semibold leading-6 bg-base-300  shadow-sm rounded-none  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={() => searchContractors(1)}
        >
          Szukaj
        </button>
      </div>
    </div>
  );
};

export default ContractorFilterMobileByTextInput;
