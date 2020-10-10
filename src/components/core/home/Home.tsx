import React, { useState, useEffect } from "react";
import { Product, History, State } from "../../../interfaces";
import { connect } from "react-redux";
import {
  getNewProducts,
  getBestSellers,
  getSales
} from "../../../actions/product";
import { scrollOnTopOfThePage } from "../../../helpers";

// Components
import Slides from "./Slides";
import ProductsGrid from "../product/ProductsGrid";
import HomeTags from "./tags/HomeTags";

const Home = (props: {
  products: {
    new_products: Product[];
    best_sellers: Product[];
    sales: Product[];
  };
  getNewProducts: Function;
  getBestSellers: Function;
  getSales: Function;
  history: History;
}) => {
  const [newProducts, setNewProducts] = useState([] as Product[]);
  const [bestSellers, setBestSellers] = useState([] as Product[]);
  const [sales, setSales] = useState([] as Product[]);
  const [grids] = useState([
    {
      title: "Νέα Προϊόντα",
      titleIcon: "far fa-calendar-plus",
      paragraph: "Δείτε τα νέα προϊόντα του καταστήματος μας."
    },
    {
      title: "Κορυφαίες Πωλήσεις",
      titleIcon: "fas fa-chart-line",
      paragraph: "Το κατάστημα μας προσφέρει προϊόντα της καλύτερης ποιότητας."
    },
    {
      title: "Προσφορές",
      titleIcon: "fas fa-piggy-bank",
      paragraph: "Εξοικονόμησε χρήματα τώρα με τις προσφορές μας."
    }
  ]);

  useEffect(() => {
    scrollOnTopOfThePage();

    props.getNewProducts();
    props.getBestSellers();
    props.getSales();

    setNewProducts(props.products.new_products);
    setBestSellers(props.products.best_sellers);
    setSales(props.products.sales);

    document.querySelector("footer")!.classList.add("no-mt-footer");
  }, []);

  useEffect(() => {
    setNewProducts(props.products.new_products);
    setBestSellers(props.products.best_sellers);
    setSales(props.products.sales);
  }, [props.products]);

  return (
    <div className="home layout">
      <Slides />

      <div className="container">
        {grids.map((grid, i) => (
          <ProductsGrid
            key={i}
            title={grid.title}
            titleIcon={grid.titleIcon}
            paragraph={grid.paragraph}
            products={i === 0 ? newProducts : i === 1 ? bestSellers : sales}
            history={props.history}
          />
        ))}
      </div>

      <HomeTags history={props.history} />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  products: state.product
});

export default connect(mapStateToProps, {
  getNewProducts,
  getBestSellers,
  getSales
})(Home);
