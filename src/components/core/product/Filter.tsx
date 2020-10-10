import React from "react";
import { Category } from "../../../interfaces";

const Filter = (props: {
  filterTitle: string;
  selected: string;
  filterList: string[];
  filter: string;
  showSortByList: boolean;
  setShowSortByList: Function;
  showCategoriesList: boolean;
  setShowCategoriesList: Function;
  setSortBy: Function;
  setCategories: Function;
  categories: Category[];
  setQuery: Function;
  query: { page: number; filter: string; sortBy: string; category: string };
}) => {
  return (
    <div className="filter">
      <span className="select-title">{props.filterTitle}</span>

      <div
        className="select"
        onClick={() => {
          if (props.filter === "sortBy") {
            props.setShowSortByList(!props.showSortByList);
            props.setShowCategoriesList(false);
          } else {
            props.setShowCategoriesList(!props.showCategoriesList);
            props.setShowSortByList(false);
          }
        }}
      >
        <div className="icon">
          <i className="fas fa-chevron-down"></i>
        </div>

        <span className="selected">{props.selected}</span>

        <div
          className="sublist"
          style={
            props.filter === "sortBy"
              ? props.showSortByList
                ? {}
                : { display: "none" }
              : props.showCategoriesList
              ? {}
              : { display: "none" }
          }
        >
          {props.filter === "sortBy"
            ? props.filterList.map((item, i) => (
                <span
                  key={i}
                  data-value={item}
                  onClick={e => {
                    props.setSortBy({
                      title: props.filterTitle,
                      selected: e.currentTarget.dataset.value,
                      list: props.filterList
                    });

                    let filter = "";
                    let sortBy = "ASC";

                    if (item === "Νέα Προϊόντα") {
                      filter = "created_at";
                      sortBy = "DESC";
                    } else if (item === "Καλύτερες Πωλήσεις") {
                      filter = "sold";
                    } else if (item === "Προσφορές") {
                      filter = "sale";
                    } else if (item === "Τιμή Φθίνουσα") {
                      filter = "price";
                      sortBy = "DESC";
                    } else {
                      filter = "price";
                    }

                    props.setQuery({ ...props.query, filter, sortBy });
                  }}
                >
                  {item}
                </span>
              ))
            : props.categories.map((c, i) => (
                <span
                  key={i}
                  onClick={e => {
                    props.setCategories({
                      title: props.filterTitle,
                      selected: c.name,
                      list: props.categories
                    });

                    props.setQuery({ ...props.query, category: c.id });
                  }}
                >
                  {c.name}
                </span>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
