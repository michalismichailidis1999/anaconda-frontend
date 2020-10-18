import React, { useState, useEffect } from "react";
import { scrollOnTopOfThePage } from "../../../helpers";
import { connect } from "react-redux";
import { removeError } from "../../../actions/formError";
import { getTotalPages } from "../../../actions/order";
import { State } from "../../../interfaces";

// Components
import UserSidebar from "./UserSidebar";
import MyOrders from "./myOrders/MyOrders";
import MyDeliveryDetails from "./MyDeliveryDetails";
import MyUserDetails from "./userDetails/MyUserDetails";

const User = (props: {
  removeError: Function;
  userId: string;
  token: string;
  getTotalPages: Function;
}) => {
  const [choosed, setChoosed] = useState(0);

  useEffect(() => {
    let search = window.location.search;

    if (search === "?my_orders") {
      setChoosed(1);
    } else if (search === "?user_details") {
      setChoosed(3);
    }

    scrollOnTopOfThePage();

    props.getTotalPages(props.userId, props.token);

    document.querySelector("footer")!.classList.remove("no-mt-footer");

    return () => props.removeError();
  }, []);

  return (
    <div className="layout user">
      <div className="centered-everything">
        <div className="container-centered">
          <UserSidebar choosed={choosed} setChoosed={setChoosed} />

          <div className="user-info-box">
            {choosed === 0 && (
              <div className="welcome-message">
                <h2>
                  Καλωσόρισες Μιχάλη! <br />
                  Χαιρόμαστε που σε έχουμε πάλι πίσω.
                  <span role="img" aria-label="face">
                    😄
                  </span>
                </h2>
              </div>
            )}

            {choosed === 1 && <MyOrders />}

            {choosed === 2 && <MyDeliveryDetails />}

            {choosed === 3 && <MyUserDetails />}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  userId: state.user.user.id,
  token: state.user.token
});

export default connect(mapStateToProps, { removeError, getTotalPages })(User);
