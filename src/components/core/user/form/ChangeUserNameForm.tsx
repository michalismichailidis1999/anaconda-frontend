import React, { useState } from "react";
import { connect } from "react-redux";
import { State } from "../../../../interfaces";
import { updateUserFirstAndLastNames } from "../../../../actions/user";

const ChangeUserNameForm = (props: {
  changeHasBeenMade: boolean;
  setChangeHasBeenMade: Function;
  userId: string;
  token: string;
  firstName: string;
  lastName: string;
  updateUserFirstAndLastNames: Function;
}) => {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);

  const [initialNames, setInitialNames] = useState({
    firstName: props.firstName,
    lastName: props.lastName
  });

  const handleSubmit = () => {
    props.setChangeHasBeenMade(false);

    setInitialNames({ firstName, lastName });

    props.updateUserFirstAndLastNames(
      props.userId,
      props.token,
      firstName,
      lastName
    );
  };

  const resetNames = () => {
    props.setChangeHasBeenMade(false);
    setFirstName(initialNames.firstName);
    setLastName(initialNames.lastName);
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        handleSubmit();
      }}
    >
      <div className="input-group">
        <label>Όνομα</label>

        <input
          type="text"
          value={firstName}
          onChange={e => {
            if (!props.changeHasBeenMade) {
              props.setChangeHasBeenMade(true);
            }
            setFirstName(e.target.value);
          }}
          placeholder="Εισάγετε το όνομα σας..."
          required={true}
          minLength={2}
          maxLength={100}
        />
      </div>

      <div className="input-group">
        <label>Επίθετο</label>

        <input
          type="text"
          value={lastName}
          onChange={e => {
            if (!props.changeHasBeenMade) {
              props.setChangeHasBeenMade(true);
            }
            setLastName(e.target.value);
          }}
          placeholder="Εισάγετε το επίθετο σας..."
          required={true}
          minLength={2}
          maxLength={100}
        />
      </div>

      {props.changeHasBeenMade && (
        <React.Fragment>
          <button className="btn" type="submit">
            Αποθήκευση
          </button>

          <button className="btn" type="button" onClick={() => resetNames()}>
            Ακύρωση
          </button>
        </React.Fragment>
      )}
    </form>
  );
};

const mapStateToProps = (state: State) => ({
  userId: state.user.user.id,
  token: state.user.token,
  firstName: state.user.user.first_name,
  lastName: state.user.user.last_name
});

export default connect(mapStateToProps, { updateUserFirstAndLastNames })(
  ChangeUserNameForm
);
