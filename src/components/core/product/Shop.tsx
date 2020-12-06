import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getFilteredProducts } from "../../../actions/product";
import { State, Product, History, Query } from "../../../interfaces";
import { setQueryBackToDefault } from "../../../actions/app";
import { scrollOnTopOfThePage } from "../../../helpers";

// Components
import Card from "./Card";
import ShopTop from "./ShopTop";

const Shop = (props: {
  getFilteredProducts: Function;
  filteredProducts: Product[];
  loading: boolean;
  history: History;
  initialQuery: Query;
  setQueryBackToDefault: Function;
  pages: number
}) => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(props.initialQuery);
  const [queryString, setQueryString] = useState(
    `?page=${query.page}&filter=${query.filter}&sortBy=${query.sortBy}&category=${query.category}`
  );
  const [search, setSearch] = useState("");

  const getPages = () => {
    let pages = [];

    for(let i = 1; i <= props.pages; i++){
      pages.push(i);
    }
    return pages;
  }

  const getProducts = () => {
    props.getFilteredProducts(queryString);
  };

  useEffect(() => {
    scrollOnTopOfThePage();

    getProducts();

    document.querySelector("footer")!.classList.remove("no-mt-footer");

    return () => props.setQueryBackToDefault();
  }, []);

  useEffect(() => {
    getProducts();
  }, [queryString]);

  useEffect(() => {
    setQueryString(
      `?page=${query.page}&filter=${query.filter}&sortBy=${query.sortBy}&category=${query.category}`
    );
  }, [query]);

  useEffect(() => {
    setQuery({ ...query, page: page });
    setQueryString(
      `?page=${query.page}&filter=${query.filter}&sortBy=${query.sortBy}&category=${query.category}`
    );
  }, [page]);

  return (
    <div className="shop layout">

      <ShopTop
        page={page}
        query={query}
        setQuery={setQuery}
        search={search}
        setSearch={setSearch}
        queryString={queryString}
      />

      <div className="container shop-bottom">
        {!props.loading && props.filteredProducts.length > 0 ? (
          <React.Fragment>
            <div className="products">
              {props.filteredProducts.map((p, i) => (
                <Card product={p} key={i} history={props.history} />
              ))}
            </div>

            <div
              className="pagination"
              style={props.pages > 1 ? {} : { display: "none" }}
            >
              {getPages().map((p, i) => (
                <div
                  key={i}
                  className={page === p ? "page active" : "page"}
                  onClick={() => {
                    setPage(p);
                    scrollOnTopOfThePage()
                  }}
                >
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </React.Fragment>
        ) : (
          props.loading && (
            <div className="loading-products">
              <p>Φόρτωση...</p>
            </div>
          )
        )}

        {!props.loading && props.filteredProducts.length === 0 && (
          <div className="no-products-found">
            <p>Δεν βρέθηκαν προϊόντα.</p>
          </div>
        )}
      </div>

    </div>
  );
};

const mapStateToProps = (state: State) => ({
  filteredProducts: state.product.filtered_products,
  loading: state.product.loading,
  initialQuery: state.app.query,
  pages: state.product.pages
});

export default connect(mapStateToProps, {
  getFilteredProducts,
  setQueryBackToDefault
})(Shop);
