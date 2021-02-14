import { act } from "react-dom/test-utils";
import Product from "../../models/Product";
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCTS,
  searchProduct,
  SEARCH_PRODUCT,
  UPDATE_PRODUCT,
} from "./actions";

const initialState = {
  products: [],
  filtred: [],
  totalProducts: null,
  currentPage: null,
  nbPages: null,
  PerPage: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      const id = action.productData.id;
      const title = action.productData.title;
      const price = action.productData.price;
      const image = action.productData.image;
      const description = action.productData.description;

      const newProduct = new Product(id, title, price, image, description);

      return {
        ...state,
        products: state.products.concat(newProduct),
      };

    case FETCH_PRODUCTS:
      return {
        totalProducts: action.totalProducts,
        currentPage: action.currentPage,
        nbPages: action.nbPages,
        PerPage: action.PerPage,
        products: action.products,
        filtred: action.filtred,
      };

    case DELETE_PRODUCT:
      const productId = action.productId;
      let updatedProducts = state.products.filter(
        (product) => product._id !== productId
      );

      return {
        products: updatedProducts,
        filtred: updatedProducts,
      };

    case UPDATE_PRODUCT:
      const prodId = action.id;
      const updatePr = [...state.products];
      const selectedProductIndex = state.products.findIndex(
        (p) => p._id === prodId
      );
      const newUpdateProduct = new Product(
        prodId,
        action.productData.title,
        action.productData.price,
        action.productData.image,
        action.productData.description
      );
      updatePr[selectedProductIndex] = newUpdateProduct;

      return {
        ...state,
        products: updatePr,
      };

    case SEARCH_PRODUCT:
      const searchText = action.searchText;
      const searchPrice = action.searchPrice;
      let searchProducts = "";

      searchProducts = state.products.filter((p) => {
        return (
          p.title
            .toLowerCase()
            .trim()
            .indexOf(searchText.toLowerCase().trim()) !== -1 ||
          p.description
            .toLowerCase()
            .trim()
            .indexOf(searchText.toLowerCase().trim()) !== -1
        );
      });

      return {
        ...state,
        filtred: searchProducts,
      };

    default:
      return state;
  }
};
