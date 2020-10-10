import React from "react";
import { State, OrderProductInAdminArea } from "../../../../interfaces";
import { connect } from "react-redux";

const Table = (props: { products: OrderProductInAdminArea[] }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Προϊόν</th>
          <th>Όνομα</th>
          <th>Κατηγορία</th>
          <th>Κωδικός</th>
          <th>Τιμή</th>
          <th>Ποσότητα</th>
          <th>Βάρος</th>
        </tr>
      </thead>

      <tbody>
        {props.products.map((product, i) => (
          <tr key={i}>
            <td>
              <img
                src={require(`../../../../images/products/${product.image}`)}
                alt="Product"
              />
            </td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.code}</td>
            <td>{product.price}$</td>
            <td>{product.quantity}</td>
            <td>{product.weight}kg</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state: State) => ({
  products: state.admin.order.orderProducts
});

export default connect(mapStateToProps, {})(Table);
