import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import * as actions from "../../store/product/actions";
import * as authActions from "../../store/auth/actions";
import { useHistory } from "react-router";
import Spinner from "../UI/Spinner";

const Products = () => {
  const dispatch = useDispatch();

  //GET THE FILTRED SEARCH PRODUCTS
  const products = useSelector((state) => state.products.filtred);

  useEffect(() => {
    dispatch(actions.fetchProdcuts());
  }, []);

  if (!products || products.length == 0) {
    return <Spinner />;
  }

  return (
    <div className="d-flex m-2 flex-wrap">
      {products.map((product) => {
        return <Product key={product._id} product={product} />;
      })}
    </div>
  );
};

export default Products;
