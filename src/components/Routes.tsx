import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { State, UserState, CheckoutState } from "../interfaces";
import { getUserDetails } from "../actions/user";

// Routes
import PrivateRoute from "./protectedRoutes/PrivateRoute";
import NoAuthenticationRoute from "./protectedRoutes/NoAuthenticationRoute";
import CheckoutRoute from "./protectedRoutes/CheckoutRoute";
import AdminRoute from "./protectedRoutes/AdminRoute";

// Components
import Navbar from "./core/Navbar";
import Home from "./core/home/Home";
import Footer from "./core/Footer";
import AboveNavbar from "./core/AboveNavbar";
import SignUp from "./core/user/SignUp";
import SignIn from "./core/user/SignIn";
import User from "./core/user/User";
import Shop from "./core/product/Shop";
import Cart from "./core/cart/Cart";
import Contact from "./core/contact/Contact";
import SingleProduct from "./core/product/singleProduct/SingleProduct";
import Checkout from "./core/checkout/Checkout";
import Order from "./core/user/myOrders/Order";
import PageNotFound from "./404";

// Admin components
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/dashboard/Dashboard";

const Routes = (props: {
  user: UserState;
  checkout: CheckoutState;
  getUserDetails: Function;
  detailsId: number;
  isAdminAuthenticated: boolean;
  isOnAdminArea: boolean;
}) => {
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const { user, token } = JSON.parse(localStorage.getItem("user") + "");

      if (props.detailsId === -9999) {
        console.log("Hey");
        props.getUserDetails(user.id, token);
      }
    }
  }, []);

  return (
    <Router>
      {!props.isOnAdminArea && <AboveNavbar />}
      {!props.isOnAdminArea && <Navbar />}

      <Switch>
        <Route exact path="/" component={Home} />
        <NoAuthenticationRoute
          redirectPath="/"
          path="/signup"
          isAuthenticated={props.user.isAuthenticated}
          startOrderCheckout={props.checkout.startOrderCheckout}
        >
          <SignUp />
        </NoAuthenticationRoute>
        <NoAuthenticationRoute
          redirectPath="/"
          path="/signin"
          isAuthenticated={props.user.isAuthenticated}
          startOrderCheckout={props.checkout.startOrderCheckout}
        >
          <SignIn />
        </NoAuthenticationRoute>
        <PrivateRoute
          redirectPath="/signin"
          path="/user"
          isAuthenticated={props.user.isAuthenticated}
          startOrderCheckout={props.checkout.startOrderCheckout}
        >
          <User />
        </PrivateRoute>
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/product/:productId" component={SingleProduct} />
        <CheckoutRoute
          redirectPath="/"
          path="/checkout"
          isAuthenticated={props.user.isAuthenticated}
          startOrderCheckout={props.checkout.startOrderCheckout}
        >
          <Checkout />
        </CheckoutRoute>
        <PrivateRoute
          redirectPath="/"
          path="/order/:orderId"
          isAuthenticated={props.user.isAuthenticated}
          startOrderCheckout={props.checkout.startOrderCheckout}
        >
          <Order />
        </PrivateRoute>
        <Route exact path="/admin/login" component={AdminLogin} />

        <AdminRoute
          redirectPath="/admin/login"
          path="/admin/dashboard"
          isAuthenticated={props.isAdminAuthenticated}
          startOrderCheckout={false}
        >
          <Dashboard />
        </AdminRoute>

        <Route component={PageNotFound} />
      </Switch>

      {!props.isOnAdminArea && <Footer />}
    </Router>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.user,
  checkout: state.checkout,
  detailsId: state.user.details.id,
  isAdminAuthenticated: state.admin.user.adminIsAuthenticated,
  isOnAdminArea: state.app.isOnAdminArea,
});

export default connect(mapStateToProps, { getUserDetails })(Routes);
