import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSignedUsers } from "../../../actions/admin/signedUsers";
import { State } from "../../../interfaces";

// Components
import Table from "./Table";

const Users = (props: {
  userId: string;
  token: string;
  fetchSignedUsers: Function;
}) => {
  useEffect(() => {
    props.fetchSignedUsers(props.userId, props.token);
  }, []);

  return (
    <div className="users">
      <h2>
        Χρήστες <i className="fas fa-users"></i>
      </h2>

      <Table />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  userId: state.admin.user.id,
  token: state.admin.user.token,
});

export default connect(mapStateToProps, { fetchSignedUsers })(Users);
