import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { BASE_URL } from "../../config/config";
import * as actions from "../../store/product/actions";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const History = useHistory();

  const deleteProductHandler = (productId) => {
    dispatch(actions.deleteProduct(productId));
  };

  return (
    <div className="d-flex justify-content-center  m-2">
      <div className="card p-3 bg-white">
        <i className="fa fa-apple"></i>
        <div className="about-product text-center mt-2">
          <img
            src={BASE_URL + product.image}
            width="300"
            height="200"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="stats mt-2">
          <div className="d-flex justify-content-between p-price">
            <span>{product.title}</span>
            <span>{product.price}$</span>
          </div>
          <div className="d-flex justify-content-between p-price">
            <p>{product.description}</p>
          </div>
          <div className="d-flex justify-content-between ">
            <button
              className="btn btn-primary"
              onClick={() =>
                History.push("/addproduct", { productId: product._id })
              }
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => deleteProductHandler(product._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
