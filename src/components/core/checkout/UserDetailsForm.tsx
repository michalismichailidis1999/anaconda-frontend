import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { goToNextStep } from "../../../actions/checkout";
import { scrollOnTopOfThePage } from "../../../helpers";

const UserDetailsForm = (props: {
  goToNextStep: Function;
  county: string;
  city: string;
  address: string;
  phone: string;
  zipcode: string;
  setCounty: Function;
  setCity: Function;
  setAddress: Function;
  setPhone: Function;
  setZipcode: Function;
  customerName: string;
  setCustomerName: Function;
}) => {
  const [showError, setShowError] = useState(false);

  const onSubmitForm = () => {
    if (
      props.county === "" ||
      props.city === "" ||
      props.address === "" ||
      props.phone === "" ||
      props.zipcode === "" ||
      props.customerName === ""
    ) {
      setShowError(true);
      return;
    }

    props.goToNextStep();
  };

  useEffect(() => {
    scrollOnTopOfThePage();
  }, []);

  return (
    <Fragment>
      <form
        className="user-details-form"
        onSubmit={e => {
          e.preventDefault();

          onSubmitForm();
        }}
      >
        <h4>Συμπληρώστε τα στοιχεία σας</h4>

        <div className="input-group">
          <label>Ονοματεπώνυμο</label>
          <input
            className={
              showError && props.customerName === "" ? "with-error" : ""
            }
            type="text"
            placeholder="Εισάγετε τον ονοματεπώνυμο σας..."
            value={props.customerName}
            onChange={e => {
              props.setCustomerName(e.target.value);

              if (showError) {
                setShowError(false);
              }
            }}
          />
        </div>

        <div className="input-group">
          <label>Νομός</label>
          <input
            className={showError && props.county === "" ? "with-error" : ""}
            type="text"
            placeholder="Εισάγετε τον νομό σας..."
            value={props.county}
            onChange={e => {
              props.setCounty(e.target.value);

              if (showError) {
                setShowError(false);
              }
            }}
          />
        </div>

        <div className="input-group">
          <label>Πόλη</label>
          <input
            type="text"
            placeholder="Εισάγετε την πόλη σας..."
            className={showError && props.city === "" ? "with-error" : ""}
            value={props.city}
            onChange={e => {
              props.setCity(e.target.value);

              if (showError) {
                setShowError(false);
              }
            }}
          />
        </div>

        <div className="input-group">
          <label>Διεύθυνση</label>
          <input
            type="text"
            placeholder="Εισάγετε την διεύθυνση σας..."
            className={showError && props.address === "" ? "with-error" : ""}
            value={props.address}
            onChange={e => {
              props.setAddress(e.target.value);

              if (showError) {
                setShowError(false);
              }
            }}
          />
        </div>

        <div className="input-group">
          <label>Κινητό ή Σταθερό</label>
          <input
            type="text"
            placeholder="Εισάγετε τον αριρμό σας..."
            className={showError && props.phone === "" ? "with-error" : ""}
            value={props.phone}
            onChange={e => {
              props.setPhone(e.target.value);

              if (showError) {
                setShowError(false);
              }
            }}
          />
        </div>

        <div className="input-group">
          <label>Ταχυδρομικός Κώδικας</label>
          <input
            type="text"
            placeholder="Εισάγετε τον ταχ.κωδ. σας..."
            className={showError && props.zipcode === "" ? "with-error" : ""}
            value={props.zipcode}
            onChange={e => {
              props.setZipcode(e.target.value);

              if (showError) {
                setShowError(false);
              }
            }}
          />
        </div>

        <button className="btn" type="submit">
          Συνέχεια
        </button>
      </form>

      {showError && (
        <div className="form-error">
          <p>Παρακαλώ συμπληρώστε όλα τα πεδία.</p>
        </div>
      )}
    </Fragment>
  );
};

export default connect(null, { goToNextStep })(UserDetailsForm);
