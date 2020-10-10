import {
  GET_NEW_PRODUCTS,
  GET_BEST_SELLERS,
  GET_SALES,
  GET_FILTERED_PRODUCTS,
  GET_RECOMMENDED_PRODUCTS,
  LOADING_PRODUCTS,
  GET_PRODUCT,
  SET_PRODUCT_FETCHED_TO_FALSE,
  COMMENT_ON_PRODUCT,
  DELETE_COMMENT,
  GET_CATEGORIES,
} from "../actions/types/product";
import {
  Product,
  ProductState,
  ProductComment,
  ProductRate,
  Category,
} from "../interfaces";

const initialState: ProductState = {
  new_products: [],
  best_sellers: [],
  sales: [],
  filtered_products: [],
  recommended_products: [],
  loading: false,
  product: {
    id: "",
    category_id: "",
    price: -9999,
    quantity: -9999,
    sold: -9999,
    created_at: "",
    updated_at: "",
    description: "",
    on_sale: -9999,
    new_price: -9999,
    image: "",
    image2: "",
    image3: "",
    image4: "",
    name: "",
    rate: -9999,
    weight: -9999,
    code: "",
  },
  productFetched: false,
  productComments: [],
  productRates: [],
  productCategory: "",
  myProductRate: 0,
  categories: [],
};

const productReducer = (
  state = initialState,
  action: {
    type: string;
    payload: {
      products: Product[];
      comments: ProductComment[];
      rates: ProductRate[];
      product: Product;
      category: string;
      my_rate: number;
      commentId: number;
      categories: Category[];
    };
  }
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NEW_PRODUCTS:
      return { ...state, new_products: payload.products };
    case GET_BEST_SELLERS:
      return { ...state, best_sellers: payload.products };
    case GET_SALES:
      return { ...state, sales: payload.products };
    case GET_FILTERED_PRODUCTS:
      return { ...state, filtered_products: payload.products, loading: false };
    case GET_RECOMMENDED_PRODUCTS:
      return { ...state, recommended_products: payload.products };
    case LOADING_PRODUCTS:
      return { ...state, loading: true };
    case GET_PRODUCT:
      let rates = [] as ProductRate[];

      for (let i = 1; i < 6; i++) {
        let index = payload.rates.findIndex((rate) => rate.star === i);
        if (index === -1) {
          rates.push({ star: i, stars_count: 0 });
        } else {
          rates.push(payload.rates[index]);
        }
      }

      return {
        ...state,
        product: payload.product,
        productComments: payload.comments,
        productRates: rates,
        productCategory: payload.category,
        myProductRate: payload.my_rate,
        productFetched: true,
      };
    case SET_PRODUCT_FETCHED_TO_FALSE:
      return { ...state, productFetched: false };
    case COMMENT_ON_PRODUCT:
      return { ...state, productComments: payload.comments };
    case DELETE_COMMENT:
      let comments = [...state.productComments].filter(
        (c) => c.id !== payload.commentId
      );

      return { ...state, productComments: comments };
    case GET_CATEGORIES:
      return { ...state, categories: payload.categories };
    default:
      return state;
  }
};

export default productReducer;
