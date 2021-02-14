import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/auth/actions";

import { useHistory } from "react-router";

const TryLogin = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (!userData) {
      return history.push("/login");
    }

    const transformedData = JSON.parse(userData);
    const { token, userId, expiryDate } = transformedData;
    const expirationDate = new Date(expiryDate);

    if (expirationDate <= new Date()) {
      return history.push("/login");
    }

    const expiryTime = expirationDate.getTime() - new Date().getTime();

    dispatch(actions.authenticate(userId, token, expiryTime));
  }, [dispatch]);

  return props.children;
};

export default TryLogin;
