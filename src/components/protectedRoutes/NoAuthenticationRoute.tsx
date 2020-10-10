import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IPrivateRouteProps } from "../../interfaces";

const NoAuthenticationRoute: React.FC<IPrivateRouteProps> = props => {
  return props.isAuthenticated === false ? (
    <Route {...props} component={props.component} />
  ) : (
    <Redirect to={{ pathname: props.redirectPath }} />
  );
};

export default NoAuthenticationRoute;
