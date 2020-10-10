import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import { searchProduct } from "../../../actions/product";
import { connect } from "react-redux";
import { State, Category } from "../../../interfaces";

const ShopTop = (props: {
  page: number;
  query: { page: number; filter: string; sortBy: string; category: string };
  setQuery: Function;
  search: string;
  setSearch: Function;
  searchProduct: Function;
  queryString: string;
  categories: Category[];
  categoryName: string;
}) => {
  const [showSortByList, setShowSortByList] = useState(false);
  const [showCategoriesList, setShowCategoriesList] = useState(false);

  const [sortBy, setSortBy] = useState({
    title: "Ταξινόμηση",
    selected:
      props.query.filter === "created_at"
        ? "Νέα Προϊόντα"
        : props.query.filter === "sale"
        ? "Προσφορές"
        : props.query.filter === "sold"
        ? "Καλύτερες Πωλήσεις"
        : props.query.filter === "price" && props.query.sortBy === "ASC"
        ? "Τιμή Αύξουσα"
        : "Τιμή Φθίνουσα",
    list: [
      "Νέα Προϊόντα",
      "Προσφορές",
      "Καλύτερες Πωλήσεις",
      "Τιμή Φθίνουσα",
      "Τιμή Αύξουσα"
    ]
  });

  const [categories, setCategories] = useState({
    title: "Κατηγορία",
    selected: props.categoryName,
    list: [{ id: "", name: "Όλες" }, ...props.categories] as Category[]
  });

  useEffect(() => {
    setCategories({
      title: "Κατηγορία",
      selected: props.categoryName,
      list: [{ id: "", name: "Όλες" }, ...props.categories] as Category[]
    });
  }, [props.categories]);

  return (
    <div className="container shop-top">
      <div className="search-bar">
        <div className="input-group">
          <span
            onClick={() => props.searchProduct(props.queryString, props.search)}
          >
            <i className="fas fa-search"></i>
          </span>{" "}
          <input
            type="text"
            placeholder="Αναζήτηση..."
            value={props.search}
            onChange={e => props.setSearch(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                props.searchProduct(props.queryString, props.search);
              }
            }}
          />
        </div>
      </div>

      <div className="filter-by">
        <Filter
          filter="sortBy"
          filterList={sortBy.list}
          selected={sortBy.selected}
          filterTitle={sortBy.title}
          showSortByList={showSortByList}
          setShowSortByList={setShowSortByList}
          showCategoriesList={showCategoriesList}
          setShowCategoriesList={setShowCategoriesList}
          setSortBy={setSortBy}
          setCategories={setCategories}
          categories={[]}
          query={props.query}
          setQuery={props.setQuery}
        />

        <Filter
          filter="categories"
          filterList={sortBy.list}
          selected={categories.selected}
          filterTitle={categories.title}
          showSortByList={showSortByList}
          setShowSortByList={setShowSortByList}
          showCategoriesList={showCategoriesList}
          setShowCategoriesList={setShowCategoriesList}
          setSortBy={setSortBy}
          setCategories={setCategories}
          categories={categories.list}
          query={props.query}
          setQuery={props.setQuery}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  categories: state.product.categories,
  categoryName: state.app.categoryName
});

export default connect(mapStateToProps, { searchProduct })(ShopTop);
