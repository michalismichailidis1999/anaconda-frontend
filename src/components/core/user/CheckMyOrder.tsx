import React, {useEffect, useState} from 'react';
import {scrollOnTopOfThePage} from '../../../helpers'
import {connect} from 'react-redux';
import {State, SearchedOrder} from '../../../interfaces'
import {searchOrder} from '../../../actions/user'

const CheckMyOrder = (props: {
    searchedOrder:SearchedOrder;
    orderNotFound: boolean;
    searchOrder:Function;
}) => {
    const orderStatuses = ["Η παραγγελία μόλις δημιουργήθηκε", "Η παραγγελία βρίσκεται σε εξέλιξη", "Η παραγγελία παραδόθηκε", "Η παραγγελία ακυρώθηκε"];
    const [orderId, setOrderId] = useState("");
    const [orderDetails, setOrderDetails] = useState(props.searchedOrder.orderDetails);
    const [orderProducts, setOrderProducts] = useState(props.searchedOrder.orderProducts);
    const [orderNotFound, setOrderNotFound] = useState(props.orderNotFound); 

    useEffect(() => {
        scrollOnTopOfThePage();
    }, []);

    useEffect(() => {
        setOrderDetails(props.searchedOrder.orderDetails);
        setOrderProducts(props.searchedOrder.orderProducts);

        console.log(props.searchedOrder);
    }, [props.searchedOrder])

    useEffect(() => {
        setOrderNotFound(props.orderNotFound);
    }, [props.orderNotFound]);

    return <div className="layout check-my-order">
        <div className="centered-everything">
            <div className="container-centered">
                <div className="search-order">
                    <label>Αριθμός Παραγγελίας</label>
                    <div className="input-box">
                        <input type="text" placeholder="Αριθμός παραγγελίας" value={orderId} onChange={e => setOrderId(e.target.value)}/><button onClick={
                            () => props.searchOrder(orderId)
                        }>Αναζήτηση</button>
                    </div>
                </div>

                {(orderProducts.length > 0  || orderNotFound) && <React.Fragment>
                    <div className="order-searched">
                        <p>{
                        orderNotFound ? "Η παραγγελία δε βρέθηκε"
                        : orderDetails.status === "Created" ? orderStatuses[0]
                        : orderDetails.status === "Pending" ? orderStatuses[1]
                        : orderDetails.status === "Delivered" ? orderStatuses[2]
                        : orderStatuses[3]
                    }</p>

                        {orderProducts.length > 0 && <div className="order-searched-products">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Προϊόν</th>
                                        <th>Όνομα</th>
                                        <th>Κατηγορία</th>
                                        <th>Τιμή</th>
                                        <th>Ποσότητα</th>
                                        <th>Σύνολο</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderProducts.map((product, i) => 
                                    <tr key={i}>
                                        <td>
                                            <img src={product.image} alt="Product"/>
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price}€</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.price * product.quantity}€</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>}

                        {orderDetails.status !== "" && <div className="few-order-details">
                            <p>Κόστος Παραγγελίας: <span>{orderDetails.payment_method !== "card" ? orderDetails.total_price - 2 : orderDetails.total_price}€</span></p>
                            <p>Μεταφορικά: <span>{orderDetails.extra_price}€</span></p>
                            {orderDetails.payment_method !== "card" && <p>Αντικαταβολή: <span>2€</span></p>}
                            <p>Σύνολο: <span>{orderDetails.total_price + orderDetails.extra_price}€</span></p>
                        </div>}
                    </div>
                </React.Fragment>}
            </div>
        </div>
    </div>
}

const mapStateToProps = (state:State) => ({
    searchedOrder: state.user.searchedOrder,
    orderNotFound: state.user.orderNotFound
});

export default connect(mapStateToProps, {searchOrder})(CheckMyOrder);