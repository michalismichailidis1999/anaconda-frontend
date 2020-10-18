import {
  OrderState,
  Order,
  OrderProduct,
  OrderPaymentDetails,
  OrderDeliveryDetails,
} from "../interfaces";
import {
  GET_ORDERS,
  FETCHING_ORDERS,
  GET_TOTAL_PAGES,
  GET_ORDER,
  GETTING_ORDER
} from "../actions/types/order";
import { LOG_OUT } from "../actions/types/user";

const initialState: OrderState = {
  myOrders: [],
  orderProducts: [],
  orderDeliveryDetails: {
    county: "",
    city: "",
    address: "",
    zipcode: "",
    phone: "",
    customer_name: "",
  },
  orderPaymentDetails: {
    id: "",
    status: "",
    total_price: 0,
    payment_method: "",
    paid: -9999,
    extra_price: 0
  },
  fetchingOrders: false,
  ordersFetched: false,
  totalPages: 0,
  orderFetched: false,
  fetchingOrder: false
};

const orderReducer = (
  state = initialState,
  action: {
    type: string;
    payload: {
      orders: Order[];
      totalPages: number;
      products: OrderProduct[];
      deliveryDetails: OrderDeliveryDetails;
      paymentDetails: OrderPaymentDetails;
    };
  }
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ORDERS:
      return {
        ...state,
        myOrders: payload.orders,
        ordersFetched: true,
        fetchingOrders: false,
      };

    case FETCHING_ORDERS:
      return { ...state, fetchingOrders: true, ordersFetched: false };
    case GET_TOTAL_PAGES:
      return { ...state, totalPages: payload.totalPages };

    case LOG_OUT:
      return initialState;
    case GET_ORDER:
      return {
        ...state,
        orderProducts: payload.products,
        orderDeliveryDetails: payload.deliveryDetails,
        orderPaymentDetails: payload.paymentDetails,
        orderFetched: true,
        fetchingOrder: false
      };
    case GETTING_ORDER:
      return {...state, fetchingOrder: true};
    default:
      return state;
  }
};

export default orderReducer;
