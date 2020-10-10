import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { State, AdminProductState } from "../../../interfaces";
import {
  setShowCreateProduct,
  setShowProducts,
  setShowUpdateProduct,
} from "../../../actions/admin/product";

// Components
import ShowProducts from "./showProducts/ShowProducts";
import CreateProduct from "./createProduct/CreateProduct";
import UpdateProduct from "./updateProduct/UpdateProduct";

const Products = (props: {
  adminProductState: AdminProductState;
  setShowCreateProduct: Function;
  setShowProducts: Function;
  setShowUpdateProduct: Function;
}) => {
  const [showProducts, setShowProducts] = useState(
    props.adminProductState.showProducts
  );
  const [showCreateProduct, setShowCreateProduct] = useState(
    props.adminProductState.showCreateProduct
  );
  const [showUpdateProduct, setShowUpdateProduct] = useState(
    props.adminProductState.showUpdateProduct
  );

  const setComponentToShow = (
    products: boolean,
    create: boolean,
    update: boolean
  ) => {
    props.setShowProducts(products);
    props.setShowCreateProduct(create);
    props.setShowUpdateProduct(update);
  };

  useEffect(() => {
    let query = window.location.search;

    // ?view_products&create
    // ?view_products&update&id=1
    if (query.split("&").length > 1) {
      if (query.split("&")[1] === "create") {
        setComponentToShow(false, true, false);
      } else {
        setComponentToShow(false, false, true);
      }
    } else {
      if (!showProducts) {
        setComponentToShow(true, false, false);
      }
    }
  }, []);

  useEffect(() => {
    setShowProducts(props.adminProductState.showProducts);
    setShowCreateProduct(props.adminProductState.showCreateProduct);
    setShowUpdateProduct(props.adminProductState.showUpdateProduct);
  }, [props.adminProductState]);

  return (
    <div className="products-admin">
      <h2>
        Προϊόντα <i className="fas fa-tags"></i>
      </h2>

      {showProducts && <ShowProducts />}

      {showCreateProduct && <CreateProduct />}

      {showUpdateProduct && <UpdateProduct />}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  adminProductState: state.admin.product,
});

export default connect(mapStateToProps, {
  setShowCreateProduct,
  setShowProducts,
  setShowUpdateProduct,
})(Products);
