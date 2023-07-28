import React from "react";
import Select from "react-select";

const FilterMobileByTextInput = (props) => {
  const {
    handleFirstSelectChange,
    handleSecondSelectChange,
    handleThirdSelectChange,
    selectedCategory,
    setVoivodeship,
    setCity,
    voivodeships,
    searchOrders,
    clearCategories,
    mainCategories,
    childCategories,
    subChildCategories,
  } = props.datas;
  return (
    <div
      data-theme="cupcake"
      className="collapse collapse-arrow border border-base-300 rounded-none md:hidden w-full"
    >
      <input type="checkbox" />
      <div className="collapse-title  text-lg font-medium">Filtruj</div>
      <div className="collapse-content">
        <div
          data-theme="cupcake"
          className="border collapse collapse-arrow border-base-300 rounded-none"
        >
          <input type="checkbox" />
          <div className="collapse-title  text-lg font-medium">Kategorie</div>
          <div className="collapse-content w-full">
            <div className="selects mb-5">
              <Select
                key={`mainCategories`}
                className="px-0 h-10"
                menuPortalTarget={document.body}
                options={mainCategories}
                value={selectedCategory == null ? null : selectedCategory.id}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="Wszystkie kategorie"
                onChange={(e) => handleFirstSelectChange(e)}
                noOptionsMessage={({ inputValue }) =>
                  !inputValue ? "Brak kategorii" : "Nie znaleziono"
                }
              />
              {childCategories != null && (
                <Select
                  key={`childCategories`}
                  className="px-0 h-10"
                  menuPortalTarget={document.body}
                  options={childCategories}
                  value={selectedCategory == null ? null : selectedCategory.id}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  placeholder="Kategoria"
                  onChange={(e) => handleSecondSelectChange(e)}
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue ? "Brak podkategorii" : "Nie znaleziono"
                  }
                />
              )}
              {subChildCategories != null && (
                <Select
                  key={`subChildCategories`}
                  className="px-0 h-10"
                  menuPortalTarget={document.body}
                  options={subChildCategories}
                  value={selectedCategory == null ? null : selectedCategory.id}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  placeholder="Kategoria"
                  onChange={(e) => handleThirdSelectChange(e)}
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue ? "Brak podkategorii" : "Nie znaleziono"
                  }
                />
              )}
            </div>
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
          <div className="collapse-title  text-lg font-medium">Lokalizacja</div>
          <div className="collapse-content w-full">
            <Select
              className="px-0 h-10"
              menuPortalTarget={document.body}
              options={voivodeships}
              placeholder="Województwo"
              onChange={(e) => setVoivodeship(e.value)}
              noOptionsMessage={({ inputValue }) =>
                !inputValue ? "Brak województw" : "Nie znaleziono województwa"
              }
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
          onClick={() => searchOrders(1)}
        >
          Szukaj
        </button>
      </div>
    </div>
  );
};

export default FilterMobileByTextInput;
