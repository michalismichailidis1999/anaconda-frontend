import React from "react";
import Card from "./Card";
import { Product, History } from "../../../interfaces";

const ProductsGrid = (props: {
  title: string;
  titleIcon: string;
  paragraph: string;
  products: Product[];
  history: History;
}) => {
  return (
    <React.Fragment>
      <div
        className="products-title"
        style={props.products.length === 0 ? { display: "none" } : {}}
      >
        <h1>
          {props.title} <i className={props.titleIcon}></i>
        </h1>

        <p>{props.paragraph}</p>
      </div>

      <div className="products">
        {props.products.map(product => (
          <Card key={product.id} product={product} history={props.history} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default ProductsGrid;
