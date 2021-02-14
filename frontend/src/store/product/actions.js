import { BASE_URL } from "../../config/config";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";

export const fetchProducts = (page) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(BASE_URL + "products/" + page, {
      method: "GET",
    });

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: FETCH_PRODUCTS,
      totalProducts: resData.totalProducts,
      currentPage: resData.currentPage,
      nbPages: resData.nbPages,
      PerPage: resData.PerPage,
      products: resData.products,
      filtred: resData.products,
    });
  };
};

export const addProduct = (title, price, image, description) => {
  try {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
      let formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("image", image);
      formData.append("description", description);

      const response = await fetch(BASE_URL + "product", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Something went  !!!");
      }

      const resData = await response.json();

      dispatch({
        type: ADD_PRODUCT,
        productData: {
          id: resData._id,
          title: resData.title,
          price: resData.price,
          image: resData.image,
          description: resData.description,
        },
      });
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProduct = (productId, title, price, image, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    let formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("description", description);

    const response = await fetch(BASE_URL + "product/" + productId, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    const resData = await response.json();

    dispatch({
      type: UPDATE_PRODUCT,
      id: productId,
      productData: {
        title: resData.title,
        price: resData.price,
        image: resData.image,
        description: resData.description,
      },
    });
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(BASE_URL + "product/" + productId, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(response);
    const resData = await response.json();

    dispatch({
      type: DELETE_PRODUCT,
      productId: productId,
    });
  };
};

export const searchProduct = (searchText) => {
  return {
    type: SEARCH_PRODUCT,
    searchText: searchText,
  };
};
