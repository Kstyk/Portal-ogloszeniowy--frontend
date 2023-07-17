import React from "react";
import Select from "react-select";

const SortOffers = (props) => {
  const {
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    page,
    searchOffers,
    isActive,
  } = props.data;

  const sortOptions = [
    { value: "PublicDate", label: "Data publikacji" },
    { value: "Price", label: "Szacowany koszt" },
  ];

  const sortDirectionOptions = [
    { value: "DESC", label: "malejąco" },
    { value: "ASC", label: "rosnąco" },
  ];

  return (
    <div className="sort flex flex-row justify-between gap-x-3 phone:h-[40px] max-phone:flex-col max-phone:gap-y-1 mt-5">
      <Select
        className="px-0 h-full w-4/12 max-phone:w-full"
        options={sortOptions}
        placeholder="Sortuj po"
        defaultValue={sortOptions.find((e) => e.value == sortBy)}
        onChange={(e) => setSortBy(e.value)}
        styles={{
          control: (style) => ({
            ...style,
            minHeight: 0,
            height: "40px",
            // rest of styling
          }),
        }}
      />
      <Select
        className="px-0 h-full w-4/12 max-phone:w-full"
        options={sortDirectionOptions}
        placeholder="Kierunek"
        onChange={(e) => setSortDirection(e.value)}
        defaultValue={sortDirectionOptions.find(
          (e) => e.value == sortDirection
        )}
        styles={{
          control: (style) => ({
            ...style,
            minHeight: 0,
            height: "40px",
            // rest of styling
          }),
        }}
      />
      <button
        type="button"
        className="btn btn-outline min-h-full h-full max-phone:h-[40px] phone:w-3/12"
        onClick={() => searchOffers(isActive)}
      >
        Sortuj
      </button>
    </div>
  );
};

export default SortOffers;
