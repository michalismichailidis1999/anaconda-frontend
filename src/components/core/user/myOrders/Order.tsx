import React, {useEffect} from "react";
import { connect } from "react-redux";
import {
  State,
  OrderProduct,
  OrderDeliveryDetails,
  OrderPaymentDetails
} from "../../../../interfaces";
import {getOrder} from '../../../../actions/order'

const Order = (props: {
  orderFetched: boolean;
  orderProducts: OrderProduct[];
  orderDeliveryDetails: OrderDeliveryDetails;
  orderPaymentDetails: OrderPaymentDetails;
  fetchingOrder: boolean;
  getOrder:Function;
  userId:string;
  token:string;
}) => {
  useEffect(() => {
    if(!props.fetchingOrder && !props.orderFetched){
      let id = window.location.pathname.split("/")[2];
      
      props.getOrder(props.userId, props.token, id);
    }
  }, [])
  return (
    <div className="layout order">
      {!props.orderFetched && (
        <div className="loading-order">
          <p>Φόρτωση...</p>
        </div>
      )}

      {props.orderFetched && (
        <React.Fragment>
          <h2>Αριθμός Παραγγελίας #{props.orderPaymentDetails.id}</h2>

          <div className="big-table">
            <div className="table">
              <div className="thead">
                <span>Προϊόν</span>
                <span>Τιμή</span>
                <span>Ποσότητα</span>
                <span>Σύνολο</span>
              </div>

              <div className="tbody">
                {props.orderProducts.map((p, i) => (
                  <div className="tr" key={i}>
                    <div className="product-img-name">
                      <img
                        src={p.image}
                        alt="Product"
                      />

                      <span>{p.name}</span>
                    </div>

                    <div>
                      <span>{p.price}$</span>
                    </div>
                    <div>
                      <span>{p.quantity}</span>
                    </div>
                    <div>
                      <span>{p.quantity * p.price}$</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="small-tables">
            <div className="small-table">
              <h4>Στοιχεία Παράδοσης</h4>

              <div className="info-box">
                <span>Ονοματεπώνυμο:</span>
                <span>{props.orderDeliveryDetails.customer_name}</span>
              </div>

              <div className="info-box">
                <span>Νομός:</span>
                <span>{props.orderDeliveryDetails.county}</span>
              </div>

              <div className="info-box">
                <span>Πόλη:</span>
                <span>{props.orderDeliveryDetails.city}</span>
              </div>

              <div className="info-box">
                <span>Διεύθυνση:</span>
                <span>{props.orderDeliveryDetails.address}</span>
              </div>

              <div className="info-box">
                <span>Αριθμός Επικοινωνίας:</span>
                <span>{props.orderDeliveryDetails.phone}</span>
              </div>

              <div className="info-box">
                <span>Ταχυδρομικός Κώδικας:</span>
                <span>{props.orderDeliveryDetails.zipcode}</span>
              </div>
            </div>

            <div className="small-table">
              <h4>Στοιχεία Πληρωμής</h4>

              <div className="info-box">
                <span>Ποσό Παραγγελίας:</span>
                <span>{props.orderPaymentDetails.payment_method !== "card" ? props.orderPaymentDetails.total_price - 2 : props.orderPaymentDetails.total_price}€</span>
              </div>

              <div className="info-box">
                <span>Μεταφορικά:</span>
                <span>{props.orderPaymentDetails.extra_price}€</span>
              </div>

              {props.orderPaymentDetails.payment_method !== "card" && <div className="info-box">
                <span>Αντικαταβολή:</span>
                <span>2€</span>
              </div>}

              <div className="info-box">
                <span>Τρόπος Πληρωμής:</span>
                <span>
                  {props.orderPaymentDetails.payment_method === "card"
                    ? "Κάρτα"
                    : "Αντικαταβολή"}
                </span>
              </div>

              <div className="info-box">
                <span>Πληρώθηκε:</span>
                <span>
                  {props.orderPaymentDetails.paid === 1 ? "Ναι" : "Όχι"}
                </span>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  orderProducts: state.order.orderProducts,
  orderDeliveryDetails: state.order.orderDeliveryDetails,
  orderPaymentDetails: state.order.orderPaymentDetails,
  orderFetched: state.order.orderFetched,
  fetchingOrder: state.order.fetchingOrder,
  userId: state.user.user.id,
  token: state.user.token
});

export default connect(mapStateToProps, {getOrder})(Order);
