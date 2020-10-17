import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  setShowCreateProduct,
  setShowProducts,
  setShowUpdateProduct,
} from "../../../../actions/admin/product";
import { State, AdminProduct } from "../../../../interfaces";

const Table = (props: {
  setShowCreateProduct: Function;
  setShowProducts: Function;
  setShowUpdateProduct: Function;
  products: AdminProduct[];
  productsFetched: boolean;
  fetchingProducts: boolean;
}) => {
  const history = useHistory();

  return (
    <React.Fragment>
      {props.fetchingProducts && (
        <div className="loading-message">
          <p>Φόρτωση...</p>
        </div>
      )}

      {props.fetchingProducts === false &&
        props.productsFetched &&
        props.products.length === 0 && (
          <div className="empty-message">
            <p>Δεν βρέθηκαν προϊόντα</p>
          </div>
        )}

      {props.fetchingProducts === false &&
        props.productsFetched &&
        props.products.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Προϊόν</th>
                <th>Όνομα</th>
                <th>Κατηγορία</th>
                <th>Κωδικός</th>
                <th>Τιμή</th>
                <th>Βάρος</th>
                <th>Αξιολόγηση</th>
                <th>Επεξεργασία</th>
              </tr>
            </thead>

            <tbody>
              {props.products.map((p, i) => (
                <tr key={i}>
                  <td>
                    <img
                      src={p.image}
                      alt="Product"
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.code}</td>
                  <td>{p.price}$</td>
                  <td>{p.weight}kg</td>
                  <td className="stars">
                    {p.rate} <i className="fas fa-star"></i>
                  </td>
                  <td
                    className="icon"
                    onClick={() => {
                      history.push(
                        `/admin/dashboard?view_products&update&id=${p.id}`
                      );
                      props.setShowProducts(false);
                      props.setShowUpdateProduct(true);
                      props.setShowCreateProduct(false);
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: State) => ({
  products: state.admin.product.products,
  productsFetched: state.admin.product.productsFetched,
  fetchingProducts: state.admin.product.fetchingProducts,
});

export default connect(mapStateToProps, {
  setShowCreateProduct,
  setShowProducts,
  setShowUpdateProduct,
})(Table);
