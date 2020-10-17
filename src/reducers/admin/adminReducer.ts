import {
  AdminState,
  User,
  OrderInAdminArea,
  OrderDetails,
  OrderProductInAdminArea,
  OrderCustomerDetails,
  AdminProduct,
  Product,
  Category,
  SignedUser,
  Message,
  ProductImage
} from "../../interfaces";
import {
  VALIDATE_ADMIN_LOGIN,
  ADMIN_LOGIN,
  GET_USERS_TOTAL_COUNT,
  ADMIN_LOG_OUT,
} from "../../actions/types/admin/user";
import {
  GET_AVG_MONTHLY_PROFIT,
  GET_ORDERS_TOTAL_COUNT,
  GET_TOTAL_PROFIT,
  GET_PIE_CHART_DATA,
  GET_LINE_CHART_DATA,
  SET_SHOW_ORDERS,
  FETCH_ORDER_DETAILS,
  FETCH_ORDER_CUSTOMER_DETAILS,
  FETCH_ORDER_PRODUCTS,
  FETCH_ORDERS,
  FETCHING_ORDERS_ADMIN,
  FETCHING_ORDER_DETAILS,
  FETCHING_ORDER_CUSTOMER_DETAILS,
  FETCHING_ORDER_PRODUCTS,
  FETCH_ORDER_BY_ID,
} from "../../actions/types/admin/order";
import {
  GET_MESSAGES_TOTAL_COUNT,
  FETCHING_MESSAGES,
  MESSAGES_FETCHED,
  MESSAGE_DELETED,
  MESSAGE_UPDATED,
  ANSWER_SENT,
  SET_SHOW_MESSAGES,
  FETCHING_MESSAGE,
  MESSAGE_FETCHED,
} from "../../actions/types/admin/message";
import {
  GET_PRODUCTS_TOTAL_COUNT,
  SET_SHOW_CREATE_PRODUCT,
  SET_SHOW_UPDATE_PRODUCT,
  SET_SHOW_PRODUCTS,
  FETCHING_PRODUCTS,
  PRODUCTS_FETCHED,
  FETCHING_PRODUCT,
  PRODUCT_FETCHED,
  PRODUCT_UPDATED,
  PRODUCT_CREATED,
  PRODUCT_DELETED,
  GET_PRODUCT_IMAGES
} from "../../actions/types/admin/product";
import {
  GET_CATEGORIES_TOTAL_COUNT,
  SET_SHOW_CATEGORIES,
  SET_SHOW_CREATE_CATEGORY,
  SET_SHOW_UPDATE_CATEGORY,
  CATEGORY_CREATED,
  CATEGORY_DELETED,
  CATEGORY_UPDATED,
  SET_CATEGORY,
} from "../../actions/types/admin/category";
import {
  FETCHING_SINGED_USERS,
  SINGED_USERS_FETCHED,
} from "../../actions/types/admin/signedUsers";
import {
  boxes,
  profitBoxes,
  lineChart,
  pieChart,
  months,
} from "../../config/adminInitialData";

const initialState: AdminState = {
  user: localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin") + "")
    : {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        adminIsAuthenticated: false,
        token: "",
      },
  dashboard: {
    boxes,
    profitBoxes,
    fetchCount: 0,
    lineChart,
    pieChart,
    lineChartDataFetched: false,
    pieChartDataFetched: false,
  },
  order: {
    showOrders: true,
    orders: [],
    orderProducts: [],
    orderCustomerDetails: {
      county: "",
      city: "",
      address: "",
      phone: "",
      zipcode: "",
      customer_email: "",
      customer_name: "",
    },
    orderDetails: {
      total_price: 0,
      total_weight: 0,
      extra_price: 0,
      paid: 0,
      payment_method: "",
      created_at: "",
      status: "",
      checked: 0,
    },
    fetchingOrder: 0,
    ordersFetched: false,
    fetchingOrders: false,
  },
  product: {
    products: [],
    showProducts: true,
    showCreateProduct: false,
    showUpdateProduct: false,
    product: {
      id: "",
      category_id: "",
      image: "",
      image2: "",
      image3: "",
      image4: "",
      price: -9999,
      name: "",
      description: "",
      quantity: -9999,
      sold: -9999,
      on_sale: -9999,
      new_price: -9999,
      weight: -999,
      code: "",
      created_at: "",
      updated_at: "",
      rate: -9999,
    },
    fetchingProducts: false,
    productsFetched: false,
    fetchingProduct: false,
    productFetched: false,
    productUpdated: false,
    productCreated: false,
    productDeleted: false,
    productImages: []
  },
  category: {
    showCategories: true,
    showCreateCategory: false,
    showUpdateCategory: false,
    categoryCreated: false,
    categoryDeleted: false,
    categoryUpdated: false,
    category: {
      id: "",
      name: "",
    },
  },
  signedUsers: {
    users: [],
    usersFetched: false,
    fetchingUsers: false,
  },
  message: {
    messages: [],
    message: {
      id: -9999,
      first_name: "",
      last_name: "",
      email: "",
      message: "",
      checked: 0,
      created_at: "",
    },
    fetchingMessage: false,
    messageFetched: false,
    fetchingMessages: false,
    messagesFetched: false,
    messageDeleted: false,
    messageUpdated: false,
    answerSent: false,
    showMessages: true,
  },
};

const adminReducer = (
  state = initialState,
  action: {
    type: string;
    payload: {
      user: User;
      token: string;
      total: number;
      total_profit: number;
      avg_monthly_profit: number;
      lineChartData: { year: number; month: number; profit: number }[];
      pieChartData: { category: string; total_product_sales: number }[];
      showOrders: boolean;
      orders: OrderInAdminArea[];
      orderCustomerDetails: OrderCustomerDetails;
      orderDetails: OrderDetails;
      orderProducts: OrderProductInAdminArea[];
      show: boolean;
      products: AdminProduct[];
      product: Product;
      category: Category;
      users: SignedUser[];
      messages: Message[];
      message: Message;
      productImages: ProductImage[];
    };
  }
) => {
  const { type, payload } = action;

  let newUser;
  let newDashboardState;
  let newOrderState;
  let newProductState;
  let newCategoryState;
  let newSignedUsersState;
  let newMessageState;

  switch (type) {
    case ADMIN_LOGIN:
      newUser = { ...state.user };
      newUser.id = payload.user.id;
      newUser.first_name = payload.user.first_name;
      newUser.last_name = payload.user.last_name;
      newUser.email = payload.user.email;
      newUser.token = payload.token;

      return { ...state, user: newUser };
    case VALIDATE_ADMIN_LOGIN:
      newUser = { ...state.user };
      newUser.adminIsAuthenticated = true;

      localStorage.setItem("admin", JSON.stringify(newUser));

      return { ...state, user: newUser };
    case ADMIN_LOG_OUT:
      localStorage.removeItem("admin");
      newUser = { ...state.user };

      newUser.adminIsAuthenticated = false;
      newUser.email = "";
      newUser.first_name = "";
      newUser.last_name = "";
      newUser.id = "";
      newUser.token = "";

      return { ...state, user: newUser };
    case GET_ORDERS_TOTAL_COUNT:
      newDashboardState = { ...state.dashboard };
      newDashboardState.boxes[0].total = payload.total;
      newDashboardState.fetchCount = newDashboardState.fetchCount + 1;
      return { ...state, dashboard: newDashboardState };
    case GET_USERS_TOTAL_COUNT:
      newDashboardState = { ...state.dashboard };
      newDashboardState.boxes[1].total = payload.total;
      newDashboardState.fetchCount = newDashboardState.fetchCount + 1;
      return { ...state, dashboard: newDashboardState };
    case GET_MESSAGES_TOTAL_COUNT:
      newDashboardState = { ...state.dashboard };
      newDashboardState.boxes[2].total = payload.total;
      newDashboardState.fetchCount = newDashboardState.fetchCount + 1;
      return { ...state, dashboard: newDashboardState };

    case GET_PRODUCTS_TOTAL_COUNT:
      newDashboardState = { ...state.dashboard };
      newDashboardState.boxes[3].total = payload.total;
      newDashboardState.fetchCount = newDashboardState.fetchCount + 1;
      return { ...state, dashboard: newDashboardState };
    case GET_CATEGORIES_TOTAL_COUNT:
      newDashboardState = { ...state.dashboard };
      newDashboardState.boxes[4].total = payload.total;
      newDashboardState.fetchCount = newDashboardState.fetchCount + 1;
      return { ...state, dashboard: newDashboardState };
    case GET_TOTAL_PROFIT:
      newDashboardState = { ...state.dashboard };
      newDashboardState.profitBoxes[0].total = payload.total_profit;
      newDashboardState.fetchCount = newDashboardState.fetchCount + 1;
      return { ...state, dashboard: newDashboardState };
    case GET_AVG_MONTHLY_PROFIT:
      newDashboardState = { ...state.dashboard };
      newDashboardState.profitBoxes[1].total = payload.avg_monthly_profit;
      newDashboardState.fetchCount = newDashboardState.fetchCount + 1;
      return { ...state, dashboard: newDashboardState };
    case GET_LINE_CHART_DATA:
      newDashboardState = { ...state.dashboard };

      newDashboardState.lineChart.data.labels.push("");
      newDashboardState.lineChart.data.datasets[0].data.push(0);

      for (let i = 0; i < payload.lineChartData.length; i++) {
        newDashboardState.lineChart.data.labels.push(
          months[payload.lineChartData[i].month - 1]
        );
        newDashboardState.lineChart.data.datasets[0].data.push(
          payload.lineChartData[i].profit
        );
      }

      newDashboardState.lineChartDataFetched = true;

      return {
        ...state,
        dashboard: newDashboardState,
      };
    case GET_PIE_CHART_DATA:
      newDashboardState = { ...state.dashboard };

      for (let i = 0; i < payload.pieChartData.length; i++) {
        newDashboardState.pieChart.data.labels.push(
          payload.pieChartData[i].category
        );
        newDashboardState.pieChart.data.datasets[0].data.push(
          payload.pieChartData[i].total_product_sales
        );
      }

      newDashboardState.pieChartDataFetched = true;

      return {
        ...state,
        dashboard: newDashboardState,
      };
    case SET_SHOW_ORDERS:
      newOrderState = { ...state.order };
      newOrderState.showOrders = payload.showOrders;
      return { ...state, order: newOrderState };
    case FETCH_ORDERS:
    case FETCH_ORDER_BY_ID:
      newOrderState = { ...state.order };
      newOrderState.orders = payload.orders;
      newOrderState.fetchingOrders = false;
      newOrderState.ordersFetched = true;
      return { ...state, order: newOrderState };
    case FETCH_ORDER_PRODUCTS:
      newOrderState = { ...state.order };
      newOrderState.orderProducts = payload.orderProducts;
      return { ...state, order: newOrderState };
    case FETCH_ORDER_DETAILS:
      newOrderState = { ...state.order };
      newOrderState.orderDetails = payload.orderDetails;
      return { ...state, order: newOrderState };
    case FETCH_ORDER_CUSTOMER_DETAILS:
      newOrderState = { ...state.order };
      newOrderState.orderCustomerDetails = payload.orderCustomerDetails;
      return { ...state, order: newOrderState };
    case FETCHING_ORDERS_ADMIN:
      newOrderState = { ...state.order };
      newOrderState.fetchingOrders = true;
      newOrderState.fetchingOrder = 0;
      return { ...state, order: newOrderState };
    case FETCHING_ORDER_CUSTOMER_DETAILS:
    case FETCHING_ORDER_PRODUCTS:
    case FETCHING_ORDER_DETAILS:
      newOrderState = { ...state.order };
      newOrderState.fetchingOrder = newOrderState.fetchingOrder + 1;
      return { ...state, order: newOrderState };
    case SET_SHOW_PRODUCTS:
      newProductState = { ...state.product };
      newProductState.showProducts = payload.show;
      return { ...state, product: newProductState };
    case SET_SHOW_CREATE_PRODUCT:
      newProductState = { ...state.product };
      newProductState.showCreateProduct = payload.show;

      if (payload.show) {
        newProductState.productCreated = false;
      }

      return { ...state, product: newProductState };
    case SET_SHOW_UPDATE_PRODUCT:
      newProductState = { ...state.product };
      newProductState.showUpdateProduct = payload.show;

      if (payload.show) {
        newProductState.productUpdated = false;
        newProductState.productDeleted = false;
      }

      return { ...state, product: newProductState };
    case FETCHING_PRODUCTS:
      newProductState = { ...state.product };
      newProductState.fetchingProducts = true;
      newProductState.productsFetched = false;
      return { ...state, product: newProductState };
    case FETCHING_PRODUCT:
      newProductState = { ...state.product };
      newProductState.fetchingProduct = true;
      newProductState.productFetched = false;
      return { ...state, product: newProductState };
    case PRODUCTS_FETCHED:
      newProductState = { ...state.product };
      newProductState.fetchingProducts = false;
      newProductState.productsFetched = true;
      newProductState.products = payload.products;
      return { ...state, product: newProductState };
    case PRODUCT_FETCHED:
      newProductState = { ...state.product };
      newProductState.fetchingProduct = false;
      newProductState.productFetched = true;
      newProductState.product = payload.product;
      return { ...state, product: newProductState };
    case PRODUCT_UPDATED:
      newProductState = { ...state.product };
      newProductState.productUpdated = true;
      return { ...state, product: newProductState };
    case PRODUCT_CREATED:
      newProductState = { ...state.product };
      newProductState.productCreated = true;
      return { ...state, product: newProductState };
    case PRODUCT_DELETED:
      newProductState = { ...state.product };
      newProductState.productDeleted = true;
      return { ...state, product: newProductState };
    case GET_PRODUCT_IMAGES:
      newProductState = { ...state.product };
      newProductState.productImages = payload.productImages;
      return { ...state, product: newProductState };
    case SET_SHOW_CATEGORIES:
      newCategoryState = { ...state.category };
      newCategoryState.showCategories = payload.show;
      return { ...state, category: newCategoryState };
    case SET_SHOW_UPDATE_CATEGORY:
      newCategoryState = { ...state.category };
      newCategoryState.showUpdateCategory = payload.show;

      if (payload.show) {
        newCategoryState.categoryUpdated = false;
        newCategoryState.categoryDeleted = false;
      }

      return { ...state, category: newCategoryState };
    case SET_SHOW_CREATE_CATEGORY:
      newCategoryState = { ...state.category };
      newCategoryState.showCreateCategory = payload.show;

      if (payload.show) {
        newCategoryState.categoryCreated = false;
      }

      return { ...state, category: newCategoryState };
    case CATEGORY_CREATED:
      newCategoryState = { ...state.category };
      newCategoryState.categoryCreated = true;
      return { ...state, category: newCategoryState };
    case CATEGORY_UPDATED:
      newCategoryState = { ...state.category };
      newCategoryState.categoryUpdated = true;
      return { ...state, category: newCategoryState };
    case CATEGORY_DELETED:
      newCategoryState = { ...state.category };
      newCategoryState.categoryDeleted = true;
      return { ...state, category: newCategoryState };
    case SET_CATEGORY:
      newCategoryState = { ...state.category };
      newCategoryState.category = payload.category;
      return { ...state, category: newCategoryState };
    case FETCHING_SINGED_USERS:
      newSignedUsersState = { ...state.signedUsers };
      newSignedUsersState.fetchingUsers = true;
      return { ...state, signedUsers: newSignedUsersState };
    case SINGED_USERS_FETCHED:
      newSignedUsersState = { ...state.signedUsers };
      newSignedUsersState.fetchingUsers = false;
      newSignedUsersState.usersFetched = true;
      newSignedUsersState.users = payload.users;
      return { ...state, signedUsers: newSignedUsersState };
    case SET_SHOW_MESSAGES:
      newMessageState = { ...state.message };

      newMessageState.showMessages = payload.show;

      if (payload.show) {
        newMessageState.messageDeleted = false;
        newMessageState.messageUpdated = false;
        newMessageState.answerSent = false;
      }

      return { ...state, message: newMessageState };
    case FETCHING_MESSAGES:
      newMessageState = { ...state.message };
      newMessageState.fetchingMessages = true;
      return { ...state, message: newMessageState };
    case MESSAGES_FETCHED:
      newMessageState = { ...state.message };
      newMessageState.fetchingMessages = false;
      newMessageState.messagesFetched = true;
      newMessageState.messages = payload.messages;
      return { ...state, message: newMessageState };
    case FETCHING_MESSAGE:
      newMessageState = { ...state.message };
      newMessageState.fetchingMessage = true;
      return { ...state, message: newMessageState };
    case MESSAGE_FETCHED:
      newMessageState = { ...state.message };
      newMessageState.fetchingMessage = false;
      newMessageState.messageFetched = true;
      newMessageState.message = payload.message;
      return { ...state, message: newMessageState };
    case MESSAGE_UPDATED:
      newMessageState = { ...state.message };
      newMessageState.messageUpdated = true;
      return { ...state, message: newMessageState };
    case MESSAGE_DELETED:
      newMessageState = { ...state.message };
      newMessageState.messageDeleted = true;
      return { ...state, message: newMessageState };
    case ANSWER_SENT:
      newMessageState = { ...state.message };
      newMessageState.answerSent = true;
      return { ...state, message: newMessageState };
    default:
      return state;
  }
};

export default adminReducer;
