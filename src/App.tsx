import React, { useEffect } from "react";
import "./styles/styles.scss";
import { connect } from "react-redux";
import { getCategories } from "./actions/product";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Components
import Routes from "./components/Routes";

const stripePK = process.env.REACT_APP_PUBLISHABLE_KEY || "";

const stripe = loadStripe(stripePK);

const App = (props: { getCategories: Function }) => {
  useEffect(() => {
    props.getCategories();
  }, []);

  return (
    <div className="app">
      <Elements stripe={stripe}>
        <Routes />
      </Elements>
    </div>
  );
};

export default connect(null, { getCategories })(App);
