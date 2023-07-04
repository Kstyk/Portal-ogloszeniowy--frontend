import React from "react";
import Select from "react-select";

const FilterMobile = (props) => {
  const {
    childCategories,
    handleFirstSelectChange,
    subChildCategories,
    selectedCategory,
    setSelectedSubCategory,
    selectedSubCategory,
    setVoivodeship,
    voivodeships,
    customStyles2,
    searchOrders,
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
              className="px-0 h-10"
              menuPortalTarget={document.body}
              options={childCategories}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              placeholder="Kategoria"
              onChange={handleFirstSelectChange}
            />
            <Select
              key={`subcategory_selec__${selectedCategory}`}
              className="px-0 h-10"
              menuPortalTarget={document.body}
              options={subChildCategories}
              value={selectedSubCategory?.id}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              placeholder="Podkategoria"
              styles={customStyles2}
              onChange={(e) => setSelectedSubCategory(e.id)}
            />
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
              styles={customStyles2}
              onChange={(e) => setVoivodeship(e.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          data-theme="cupcake"
          className="flex w-full justify-center  px-3 py-1.5 text-sm font-semibold leading-6 bg-base-300  shadow-sm rounded-none  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={() => searchOrders(1)}
        >
          Szukaj
        </button>
      </div>
    </div>
  );
};

export default FilterMobile;
