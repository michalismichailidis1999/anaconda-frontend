import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IPrivateRouteProps } from "../../interfaces";

const PrivateRoute: React.FC<IPrivateRouteProps> = props => {
  return props.startOrderCheckout === true ? (
    <Route {...props} component={props.component} />
  ) : (
    <Redirect to={{ pathname: props.redirectPath }} />
  );
};

export default PrivateRoute;
