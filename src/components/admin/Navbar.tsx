import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setShowOrders } from "../../actions/admin/order";
import {
  setShowCreateProduct,
  setShowUpdateProduct,
  setShowProducts,
} from "../../actions/admin/product";
import {
  setShowCategories,
  setShowCreateCategory,
  setShowUpdateCategory,
} from "../../actions/admin/category";
import { setShowMessages } from "../../actions/admin/message";
import { logOut } from "../../actions/admin/user";

const Navbar = (props: {
  handleNavbarChange: Function;
  setShowOrders: Function;
  setShowCreateProduct: Function;
  setShowUpdateProduct: Function;
  setShowProducts: Function;
  setShowCategories: Function;
  setShowCreateCategory: Function;
  setShowUpdateCategory: Function;
  setShowMessages: Function;
  logOut: Function;
}) => {
  const history = useHistory();

  return (
    <div className="admin-navbar">
      <ul>
        <li
          onClick={() => {
            history.push("/admin/dashboard");
            props.handleNavbarChange("dashboard");
          }}
        >
          Αρχική <i className="fas fa-tachometer-alt"></i>
        </li>
        <li
          onClick={() => {
            history.push("/admin/dashboard?view_products");
            props.handleNavbarChange("products");
            props.setShowProducts(true);
            props.setShowCreateProduct(false);
            props.setShowUpdateProduct(false);
          }}
        >
          Προϊόντα <i className="fas fa-tags"></i>
        </li>
        <li
          onClick={() => {
            history.push("/admin/dashboard?view_categories");
            props.handleNavbarChange("categories");
            props.setShowCategories(true);
            props.setShowCreateCategory(false);
            props.setShowUpdateCategory(false);
          }}
        >
          Κατηγορίες <i className="fas fa-hashtag"></i>
        </li>
        <li
          onClick={() => {
            history.push("/admin/dashboard?view_users");
            props.handleNavbarChange("users");
          }}
        >
          Χρήστες <i className="fas fa-users"></i>
        </li>
        <li
          onClick={() => {
            history.push("/admin/dashboard?view_orders");
            props.handleNavbarChange("orders");
            props.setShowOrders(true);
          }}
        >
          Παραγγελίες <i className="fas fa-truck-loading"></i>
        </li>
        <li
          onClick={() => {
            history.push("/admin/dashboard?view_messages");
            props.handleNavbarChange("messages");
            props.setShowMessages(true);
          }}
        >
          Μηνύματα <i className="fas fa-envelope"></i>
        </li>
        <li onClick={() => {
          history.push("/admin/dashboard?upload_image");
          props.handleNavbarChange("upload_image");
        }}>
          Ανέβασε Φωτογραφία <i className="fas fa-images"></i>
        </li>
        <li onClick={() => props.logOut()}>
          Αποσύνδεση <i className="fas fa-power-off"></i>
        </li>
      </ul>
    </div>
  );
};

export default connect(null, {
  setShowOrders,
  setShowCreateProduct,
  setShowUpdateProduct,
  setShowProducts,
  setShowCategories,
  setShowCreateCategory,
  setShowUpdateCategory,
  setShowMessages,
  logOut,
})(Navbar);
