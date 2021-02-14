import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../store/product/actions";

const Search = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const searchChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(actions.searchProduct(search));
  }, [dispatch, search]);

  return (
    <div>
      <div className="d-flex">
        <input
          className="form-control me-2"
          type="text"
          value={search}
          onChange={(e) => searchChangeHandler(e)}
          placeholder="Search"
          aria-label="Search"
        />
      </div>
    </div>
  );
};

export default Search;
