import React from "react";
import { connect } from "react-redux";
import { State } from "../../../interfaces";
import { removeError } from "../../../actions/formError";
import { logOut } from "../../../actions/user";

const UserSidebar = (props: {
  choosed: number;
  setChoosed: Function;
  savingChanges: boolean;
  errorOccured: boolean;
  removeError: Function;
  logOut: Function;
}) => {
  return (
    <div className="user-sidebar">
      <h4>
        Χρήστης <i className="fas fa-user"></i>
      </h4>

      <ul>
        <li
          className={
            props.choosed === 1
              ? `choosed ${!props.savingChanges ? "clickable" : "unclickable"}`
              : `${!props.savingChanges ? "clickable" : "unclickable"}`
          }
          onClick={() => {
            if (props.choosed !== 1 && !props.savingChanges) {
              props.setChoosed(1);

              if (props.errorOccured) {
                props.removeError();
              }
            }
          }}
        >
          Οι παραγγελίες μου <i className="fas fa-luggage-cart"></i>
        </li>
        <li
          className={
            props.choosed === 2
              ? `choosed ${!props.savingChanges ? "clickable" : "unclickable"}`
              : `${!props.savingChanges ? "clickable" : "unclickable"}`
          }
          onClick={() => {
            if (props.choosed !== 2 && !props.savingChanges) {
              props.setChoosed(2);

              if (props.errorOccured) {
                props.removeError();
              }
            }
          }}
        >
          Στοιχεία παράδοσης <i className="fas fa-map-marked-alt"></i>
        </li>
        <li
          className={
            props.choosed === 3
              ? `choosed ${!props.savingChanges ? "clickable" : "unclickable"}`
              : `${!props.savingChanges ? "clickable" : "unclickable"}`
          }
          onClick={() => {
            if (props.choosed !== 3 && !props.savingChanges) {
              props.setChoosed(3);

              if (props.errorOccured) {
                props.removeError();
              }
            }
          }}
        >
          Στοιχεία χρήστη <i className="fas fa-user-edit"></i>
        </li>
        <li
          className={props.savingChanges ? "unclickable" : "clickable"}
          onClick={() => {
            if (!props.savingChanges) {
              props.logOut();
            }
          }}
        >
          Αποσύνδεση <i className="fas fa-power-off"></i>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  savingChanges: state.user.savingChanges,
  errorOccured: state.formError.errorOccured
});

export default connect(mapStateToProps, { removeError, logOut })(UserSidebar);
