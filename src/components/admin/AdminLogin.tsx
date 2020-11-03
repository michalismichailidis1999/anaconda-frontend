import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { State, History } from "../../interfaces";
import { setIsOnAdminArea } from "../../actions/app";

// Components
import Login from "./Login";
import ValidateLogin from "./ValidateLogin";

const AdminLogin = (props: {
  userId: string;
  errorOccured: boolean;
  errorMessage: string;
  history: History;
  isAuthenticated: boolean;
  setIsOnAdminArea: Function;
}) => {
  const [email, setEmail] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(props.isAuthenticated);

  useEffect(() => {
    props.setIsOnAdminArea(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/admin/dashboard");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setIsAuthenticated(props.isAuthenticated);
  }, [props.isAuthenticated]);

  return (
    <div className="admin-login">
      {props.errorOccured && (
        <div className="error-message">
          <p>{props.errorMessage}</p>
        </div>
      )}

      {props.userId === "" && <Login email={email} setEmail={setEmail} />}

      {props.userId !== "" && <ValidateLogin email={email} />}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  isAuthenticated: state.admin.user.adminIsAuthenticated,
  errorOccured: state.formError.errorOccured,
  errorMessage: state.formError.errorMessage,
  userId: state.admin.user.id
});

export default connect(mapStateToProps, { setIsOnAdminArea })(AdminLogin);
