import React, { useEffect, useState } from "react";
import { State, CartItem } from "../../../interfaces";
import { connect } from "react-redux";
import { resetCheckout } from "../../../actions/checkout";
import { scrollOnTopOfThePage } from "../../../helpers";

// Components
import Steps from "./Steps";
import UserDetailsForm from "./UserDetailsForm";
import Delivery from "./Delivery";
import Payment from "./Payment";
import OrderCompletedMessage from "./OrderCompletedMessage";

const Checkout = (props: {
  currentStep: number;
  resetCheckout: Function;
  orderDone: boolean;
  county: string;
  city: string;
  address: string;
  phone: string;
  zipcode: string;
  firstName: string;
  lastName: string;
}) => {
  const [county, setCounty] = useState(props.county);
  const [city, setCity] = useState(props.city);
  const [address, setAddress] = useState(props.address);
  const [phone, setPhone] = useState(props.phone);
  const [zipcode, setZipcode] = useState(props.zipcode);
  const [customerName, setCustomerName] = useState(
    (props.firstName + " " + props.lastName).length > 2 ? props.firstName + " " + props.lastName : ""
  );

  useEffect(() => {
    scrollOnTopOfThePage();

    document.querySelector("footer")!.classList.remove("no-mt-footer");

    return () => props.resetCheckout();
  }, []);

  return (
    <div className="layout checkout">
      <div className="centered-everything">
        <div className="container-centered">
          <Steps currentStep={props.currentStep} />

          {props.currentStep === 1 && (
            <UserDetailsForm
              county={county}
              city={city}
              address={address}
              phone={phone}
              zipcode={zipcode}
              customerName={customerName}
              setCounty={setCounty}
              setCity={setCity}
              setAddress={setAddress}
              setPhone={setPhone}
              setZipcode={setZipcode}
              setCustomerName={setCustomerName}
            />
          )}

          {props.currentStep === 2 && <Delivery />}

          {props.currentStep === 3 && (
            <Payment
              county={county}
              city={city}
              address={address}
              phone={phone}
              zipcode={zipcode}
              customerName={customerName}
            />
          )}

          {props.currentStep === 4 && props.orderDone && (
            <OrderCompletedMessage
              county={county}
              city={city}
              address={address}
              phone={phone}
              zipcode={zipcode}
              customerName={customerName}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  currentStep: state.checkout.currentStep,
  county: state.user.details.county,
  city: state.user.details.city,
  address: state.user.details.address,
  phone: state.user.details.phone,
  zipcode: state.user.details.zipcode,
  isAuthenticated: state.user.isAuthenticated,
  orderDone: state.checkout.done,
  firstName: state.user.user.first_name,
  lastName: state.user.user.last_name
});

export default connect(mapStateToProps, { resetCheckout })(Checkout);
