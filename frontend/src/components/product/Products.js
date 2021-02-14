import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import * as actions from "../../store/product/actions";
import "./pagination.css";

import Spinner from "../UI/Spinner";
import ReactPaginate from "react-paginate";

const Products = () => {
  const dispatch = useDispatch();

  //GET THE FILTRED SEARCH PRODUCTS
  const products = useSelector((state) => state.products.filtred);

  const currentPage = useSelector((state) => state.products.currentPage);
  const nbPages = useSelector((state) => state.products.nbPages);
  const PerPage = useSelector((state) => state.products.PerPage);

  const [page, setPage] = useState(currentPage);

  const handleFetch = () => {
    dispatch(actions.fetchProducts(page));
  };

  useEffect(() => {
    handleFetch();
  }, [page]);

  const handlePageChange = ({ selected }) => {
    let p = selected + 1;
    setPage(p);
    handleFetch();
  };

  if (!products || products.length == 0) {
    return <Spinner />;
  }

  return (
    <div className="d-flex m-2 flex-wrap">
      {products.map((product) => {
        return <Product key={product._id} product={product} />;
      })}
      <ReactPaginate
        initialPage={currentPage}
        pageCount={nbPages}
        pageRangeDisplayed={PerPage}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={"container"}
        previousLinkClassName={"page"}
        breakClassName={"page"}
        nextLinkClassName={"page"}
        pageClassName={"page"}
        disabledClassNae={"disabled"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Products;
