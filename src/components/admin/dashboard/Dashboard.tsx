import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setIsOnAdminArea } from "../../../actions/app";
import { State } from "../../../interfaces";
import {getProductImages} from '../../../actions/admin/product'

// Components
import Navbar from "../Navbar";
import Orders from "../orders/Orders";
import BusinessDetails from "./BusinessDetails";
import Products from "../products/Products";
import Categories from "../categories/Categories";
import Users from "../users/Users";
import Messages from "../messages/Messages";
import UploadImage from "../productImages/UploadImage";

const Dashboard = (props: {
  setIsOnAdminArea: Function;
  isOnAdminArea: boolean;
  getProductImages:Function;
  userId: string;
  token:string;
}) => {
  const [choosed, setChoosed] = useState("");

  useEffect(() => {
    let query = window.location.search;

    if (query === "") {
      setChoosed("dashboard");
    } else if (query.split("&")[0] === "?view_orders") {
      setChoosed("orders");
    } else if (query.split("&")[0] === "?view_users") {
      setChoosed("users");
    } else if (query.split("&")[0] === "?view_messages") {
      setChoosed("messages");
    } else if (query.split("&")[0] === "?view_products") {
      setChoosed("products");
    } else if (query.split("&")[0] === "?view_categories") {
      setChoosed("categories");
    }else if (query.split("&")[0] === "?upload_image") {
      console.log("here");
      setChoosed("upload_image");
    }
    

    if (!props.isOnAdminArea) {
      props.setIsOnAdminArea(true);
    }

    props.getProductImages(props.userId, props.token);
  }, []);

  const handleNavbarChange = (choosed: string) => {
    setChoosed(choosed);
  };

  return (
    <div className="dashboard">
      <Navbar handleNavbarChange={handleNavbarChange} />
      <div className="dashboard-container">
        {choosed === "dashboard" && <BusinessDetails choosed={choosed} />}

        {choosed === "orders" && <Orders setChoosed={setChoosed} />}

        {choosed === "products" && <Products />}

        {choosed === "categories" && <Categories />}

        {choosed === "users" && <Users />}

        {choosed === "messages" && <Messages />}

        {choosed === "upload_image" && <UploadImage/>}
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  isOnAdminArea: state.app.isOnAdminArea,
  userId: state.admin.user.id,
  token: state.admin.user.token
});

export default connect(mapStateToProps, {
  setIsOnAdminArea,
  getProductImages
})(Dashboard);
