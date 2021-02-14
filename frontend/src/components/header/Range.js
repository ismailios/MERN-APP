import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../store/product/actions";

const Range = () => {
  const [priceRange, setPriceRange] = useState(0);

  const handleRangeChange = (e) => {
    setPriceRange(e.target.value);
  };

  return (
    <div className=" d-flex align-items-center w-25 m-4 justify-content-between">
      <input
        type="range"
        className="form-range"
        onChange={handleRangeChange}
        name="priceRange"
        min="0"
        max="1000"
      ></input>
      <input
        type="text"
        className="form-control w-25 m-2 input-sm"
        name="rangeValue"
        value={priceRange}
      />
    </div>
  );
};

export default Range;
