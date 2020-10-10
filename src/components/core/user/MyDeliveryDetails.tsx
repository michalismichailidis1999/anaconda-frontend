import React, { useState } from "react";
import { connect } from "react-redux";
import { State, UserDetails } from "../../../interfaces";
import { updateDeliveryDetails } from "../../../actions/user";

const MyDeliveryDetails = (props: {
  savingChanges: boolean;
  details: UserDetails;
  updateDeliveryDetails: Function;
  userId: string;
  token: string;
}) => {
  const [county, setCounty] = useState(props.details.county);
  const [city, setCity] = useState(props.details.city);
  const [address, setAddress] = useState(props.details.address);
  const [phone, setPhone] = useState(props.details.phone);
  const [zipcode, setZipcode] = useState(props.details.zipcode);

  const [initialDetails, setInitialDetails] = useState(props.details);

  const [changeHasBeenMade, setChangeHasBeenMade] = useState(false);

  const setEverythingBackToInitial = () => {
    setCounty(initialDetails.county);
    setCity(initialDetails.city);
    setAddress(initialDetails.address);
    setPhone(initialDetails.phone);
    setZipcode(initialDetails.zipcode);
  };

  const handleSubmit = () => {
    setChangeHasBeenMade(false);

    let detailsId = initialDetails.id;

    setInitialDetails({ county, city, address, phone, zipcode, id: detailsId });

    props.updateDeliveryDetails(props.userId, props.token, detailsId, {
      county,
      city,
      address,
      phone,
      zipcode,
    });
  };

  return (
    <div className="delivery-details">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit();
        }}
      >
        <div className="input-group">
          <label>
            Νομός <i className="fas fa-flag"></i>
          </label>
          <input
            type="text"
            value={county}
            onChange={(e) => {
              if (!changeHasBeenMade) {
                setChangeHasBeenMade(true);
              }
              setCounty(e.target.value);
            }}
            placeholder="Εισάγετε τον νομό σας..."
            required={true}
            className={props.savingChanges ? "read-only" : ""}
            readOnly={props.savingChanges}
            maxLength={80}
          />
        </div>

        <div className="input-group">
          <label>
            Πόλη <i className="fas fa-city"></i>
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => {
              if (!changeHasBeenMade) {
                setChangeHasBeenMade(true);
              }
              setCity(e.target.value);
            }}
            placeholder="Εισάγετε την πόλη σας..."
            required={true}
            className={props.savingChanges ? "read-only" : ""}
            readOnly={props.savingChanges}
            maxLength={80}
          />
        </div>

        <div className="input-group">
          <label>
            Διεύθυνση <i className="fas fa-road"></i>
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => {
              if (!changeHasBeenMade) {
                setChangeHasBeenMade(true);
              }
              setAddress(e.target.value);
            }}
            placeholder="Εισάγετε την διεύθυνση σας..."
            required={true}
            className={props.savingChanges ? "read-only" : ""}
            readOnly={props.savingChanges}
            maxLength={80}
          />
        </div>

        <div className="input-group">
          <label>
            Αριθμός Επικοινωνίας <i className="fas fa-phone-volume"></i>
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => {
              if (!changeHasBeenMade) {
                setChangeHasBeenMade(true);
              }
              setPhone(e.target.value);
            }}
            placeholder="Εισάγετε τον αριθμό σας..."
            required={true}
            className={props.savingChanges ? "read-only" : ""}
            readOnly={props.savingChanges}
            maxLength={18}
          />
        </div>

        <div className="input-group">
          <label>
            Ταχυδρομικός Κώδικας <i className="fas fa-mail-bulk"></i>
          </label>
          <input
            type="text"
            value={zipcode}
            onChange={(e) => {
              if (!changeHasBeenMade) {
                setChangeHasBeenMade(true);
              }
              setZipcode(e.target.value);
            }}
            placeholder="Εισάγετε τον ταχ.κωδ. σας..."
            required={true}
            className={props.savingChanges ? "read-only" : ""}
            readOnly={props.savingChanges}
            maxLength={18}
          />
        </div>

        {changeHasBeenMade && (
          <React.Fragment>
            <button
              className="btn"
              type="submit"
              onClick={() => {
                props.updateDeliveryDetails(
                  props.userId,
                  props.token,
                  props.details.id,
                  { county, city, address, phone, zipcode }
                );
              }}
            >
              Αποθήκευση
            </button>

            <button
              className="btn"
              type="button"
              onClick={() => {
                setChangeHasBeenMade(false);
                setEverythingBackToInitial();
              }}
            >
              Ακύρωση
            </button>
          </React.Fragment>
        )}
      </form>

      {props.savingChanges && (
        <div className="saving">
          <p>Παρακαλώ Περιμένετε...</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  savingChanges: state.user.savingChanges,
  details: state.user.details,
  userId: state.user.user.id,
  token: state.user.token,
});

export default connect(mapStateToProps, { updateDeliveryDetails })(
  MyDeliveryDetails
);
