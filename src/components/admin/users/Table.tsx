import React from "react";
import { connect } from "react-redux";
import { State, SignedUser } from "../../../interfaces";

const Table = (props: {
  users: SignedUser[];
  fetchingUsers: boolean;
  usersFetched: boolean;
}) => {
  return (
    <React.Fragment>
      {props.fetchingUsers && (
        <div className="loading-message">
          <p>Φόρτωση...</p>
        </div>
      )}

      {props.usersFetched && props.users.length === 0 && (
        <div className="empty-message">
          <p>Δεν υπάρχουν χρήστες μέχρι στιγμής.</p>
        </div>
      )}

      {props.usersFetched && props.users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Όνομα</th>
              <th>Επίθετο</th>
              <th>Email</th>
              <th>Αγορές</th>
              <th>Κέρδος στην εταιρεία</th>
            </tr>
          </thead>

          <tbody>
            {props.users.map((user, i) => (
              <tr key={i}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.total_orders}</td>
                <td>{user.total_money_spend}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: State) => ({
  users: state.admin.signedUsers.users,
  fetchingUsers: state.admin.signedUsers.fetchingUsers,
  usersFetched: state.admin.signedUsers.usersFetched,
});

export default connect(mapStateToProps, {})(Table);
