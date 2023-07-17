import React from "react";
import Select from "react-select";

const SortOrders = (props) => {
  const { setSortBy, setSortDirection, isActive, searchOrders } = props.data;

  const sortOptions = [
    { value: "StartDate", label: "Data startu" },
    { value: "Title", label: "Tytuł" },
    { value: "Budget", label: "Budżet" },
  ];

  return (
    <div className="sort flex flex-row justify-between gap-x-3 phone:h-[40px] max-phone:flex-col max-phone:gap-y-1 mt-5">
      <Select
        className="px-0 h-full w-4/12 max-phone:w-full"
        options={sortOptions}
        placeholder="Sortuj po"
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
        options={[
          { value: "DESC", label: "malejąco" },
          { value: "ASC", label: "rosnąco" },
        ]}
        placeholder="Kierunek"
        onChange={(e) => setSortDirection(e.value)}
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
        onClick={() => searchOrders(isActive)}
      >
        Sortuj
      </button>
    </div>
  );
};

export default SortOrders;
