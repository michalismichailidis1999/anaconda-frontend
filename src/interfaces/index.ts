import { RouteProps } from "react-router-dom";

export interface IPrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
  redirectPath: string;
  startOrderCheckout: boolean;
}

export interface History {
  push(url: string): void;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserDetails {
  id: number;
  county: string;
  address: string;
  phone: string;
  zipcode: string;
  city: string;
}

export interface UserState {
  user: User;
  details: UserDetails;
  isAuthenticated: boolean;
  token: string;
  savingChanges: boolean;
  emailIsUpdating: boolean;
  emailUpdated: boolean;
  passwordIsUpdating: boolean;
  passwordUpdated: boolean;
  searchedOrder: SearchedOrder;
  orderNotFound: boolean;
}

export interface SearchedOrder{
  orderDetails: SearchedOrderDetails;
  orderProducts: SearchedOrderProduct[];
}

export interface SearchedOrderDetails{
  status: string;
  total_price: number;
  extra_price: number;
  payment_method: string;
}

export interface SearchedOrderProduct{
  image:string;
  name:string;
  price:number;
  quantity: number;
  category: string;
}

export interface FormResult {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  token: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  sold: number;
  image: string;
  image2: string;
  image3: string;
  image4: string;
  created_at: string;
  updated_at: string;
  on_sale: number;
  new_price: number;
  rate: number;
  code: string;
  weight: number;
}

export interface CartItem {
  id: string;
  category_id: string;
  category_name: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  code: string;
  weight: number;
}

export interface ProductRate {
  star: number;
  stars_count: number;
}

export interface ProductComment {
  id: number;
  user: string;
  comment: string;
  rate: number;
  user_id: string;
}

export interface ProductState {
  new_products: Product[];
  best_sellers: Product[];
  sales: Product[];
  filtered_products: Product[];
  recommended_products: Product[];
  loading: boolean;
  product: Product;
  productFetched: boolean;
  productComments: ProductComment[];
  productRates: ProductRate[];
  productCategory: string;
  myProductRate: number;
  categories: Category[];
  pages: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface State {
  product: ProductState;
  user: UserState;
  formError: FormErrorState;
  formButton: FormButtonState;
  cart: CartState;
  message: MessageState;
  app: AppState;
  checkout: CheckoutState;
  order: OrderState;
  admin: AdminState;
}

export interface FormErrorState {
  errorOccured: boolean;
  errorMessage: string;
}

export interface FormButtonState {
  canClick: boolean;
}

export interface CartState {
  totalItems: number;
  totalPrice: number;
  cart: CartItem[];
  loading: boolean;
}

export interface MessageState {
  showPopup: boolean;
}

export interface Query {
  page: number;
  filter: string;
  sortBy: string;
  category: string;
}

export interface AppState {
  query: Query;
  productPageClicked: boolean;
  categoryName: string;
  isOnAdminArea: boolean;
  activeSlide: number;
}

export interface CheckoutState {
  startOrderCheckout: boolean;
  currentStep: number;
  done: boolean;
  paymentBegin: boolean;
  paymentEnd: boolean;
  extraPrice: number;
  paymentMethod: string;
  orderCreated: boolean;
  orderId: string;
  payOnDeliveryExtraPrice: number;
}

export interface OrderProduct {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface OrderPaymentDetails {
  id: string;
  status: string;
  total_price: number;
  extra_price: number;
  payment_method: string;
  paid: number;
}

export interface OrderDeliveryDetails {
  county: string;
  city: string;
  address: string;
  phone: string;
  zipcode: string;
  customer_name: string;
}

export interface Order {
  id: string;
  status: string;
  total_price: string;
  created_at: string;
}

export interface OrderState {
  myOrders: Order[];
  orderProducts: OrderProduct[];
  orderDeliveryDetails: OrderDeliveryDetails;
  orderPaymentDetails: OrderPaymentDetails;
  fetchingOrders: boolean;
  ordersFetched: boolean;
  totalPages: number;
  orderFetched: boolean;
  fetchingOrder: boolean;
}

// Admin interfaces
export interface AdminState {
  user: AdminUserState;
  dashboard: AdminDashboardState;
  order: AdminOrdersState;
  product: AdminProductState;
  category: AdminCategoryState;
  signedUsers: AdminSignedUsersState;
  message: AdminMessageState;
}

export interface Box {
  extraClass: string;
  icon: string;
  text: string;
  total: number;
}

export interface AdminDashboardState {
  boxes: Box[];
  profitBoxes: Box[];
  fetchCount: number;
  lineChart: LineChartState;
  pieChart: PieChartState;
  lineChartDataFetched: boolean;
  pieChartDataFetched: boolean;
}

export interface AdminUserState {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  adminIsAuthenticated: boolean;
  token: string;
}

export interface LineChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  pointBackgroundColor: string;
  radius: number;
}

export interface LineChartState {
  options: LineChartOptions;
  data: LineChartData;
}

export interface LineChartData {
  labels: string[];
  datasets: LineChartDataset[];
}

export interface LineChartOptions {
  title: ChartTitle;
  legend: ChartLegend;
  scales: LineChartScales;
}

export interface ChartTitle {
  display: boolean;
  text: string;
  fontSize: number;
}

export interface ChartLegend {
  display: boolean;
}

export interface LineChartScales {
  yAxes: {
    scaleLabel: {
      display: boolean;
      labelString: string;
    };
  }[];
  xAxes: {
    scaleLabel: {
      display: boolean;
      labelString: string;
    };
  }[];
}

export interface PieChartState {
  data: PieChartData;
  options: PieChartOptions;
}

export interface PieChartData {
  labels: string[];
  datasets: PieChartDataset[];
}

export interface PieChartOptions {
  title: ChartTitle;
}

export interface PieChartDataset {
  label: string;
  data: number[];
  backgroundColor: string[];
}

export interface AdminOrdersState {
  showOrders: boolean;
  orders: OrderInAdminArea[];
  orderCustomerDetails: OrderCustomerDetails;
  orderDetails: OrderDetails;
  orderProducts: OrderProductInAdminArea[];
  fetchingOrders: boolean;
  ordersFetched: boolean;
  fetchingOrder: number;
}

export interface OrderInAdminArea {
  id: string;
  checked: boolean;
}

export interface OrderCustomerDetails {
  county: string;
  city: string;
  address: string;
  phone: string;
  zipcode: string;
  customer_name: string;
  customer_email: string;
}

export interface OrderDetails {
  total_price: number;
  extra_price: number;
  total_weight: number;
  payment_method: string;
  paid: number;
  created_at: string;
  status: string;
  checked: number;
}

export interface OrderProductInAdminArea {
  image: string;
  name: string;
  price: number;
  quantity: number;
  weight: number;
  code: string;
  category: string;
}

export interface AdminProductState {
  products: AdminProduct[];
  showProducts: boolean;
  showCreateProduct: boolean;
  showUpdateProduct: boolean;
  product: Product;
  fetchingProducts: boolean;
  productsFetched: boolean;
  fetchingProduct: boolean;
  productFetched: boolean;
  productUpdated: boolean;
  productCreated: boolean;
  productDeleted: boolean;
  productImages: ProductImage[]
}

export interface ProductImage{
  id: number,
  image_path: string;
}

export interface AdminProduct {
  id: string;
  image: string;
  name: string;
  category: string;
  code: string;
  price: number;
  weight: number;
  rate: number;
}

export interface AdminCategoryState {
  showCategories: boolean;
  showCreateCategory: boolean;
  showUpdateCategory: boolean;
  categoryCreated: boolean;
  categoryUpdated: boolean;
  categoryDeleted: boolean;
  category: Category;
}

export interface SignedUser {
  first_name: string;
  last_name: string;
  email: string;
  total_orders: number;
  total_money_spend: number;
}

export interface AdminSignedUsersState {
  users: SignedUser[];
  fetchingUsers: boolean;
  usersFetched: boolean;
}

export interface AdminMessageState {
  messages: Message[];
  message: Message;
  fetchingMessages: boolean;
  messagesFetched: boolean;
  fetchingMessage: boolean;
  messageFetched: boolean;
  messageUpdated: boolean;
  messageDeleted: boolean;
  answerSent: boolean;
  showMessages: boolean;
}

export interface Message {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  message: string;
  checked: number;
  created_at: string;
}
