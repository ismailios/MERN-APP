import { BASE_URL } from "../../config/config";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTHENTICATE = "AUTHENTICATE";

const formData = new FormData();

const expirationDate = new Date(new Date().getTime() + parseInt(36 * 1000));

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
      expiryTime: expiryTime,
    });
  };
};

export const signUp = (username, email, password) => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Something went Wrong !!");
    }
    const resData = await response.json();

    dispatch({
      type: SIGNUP,
    });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(BASE_URL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Something went Wrong !!");
    }

    const resData = await response.json();

    dispatch(authenticate(resData.userId, resData.token, expirationDate));

    saveDataToStorage(resData.token, resData.userId, expirationDate);
  };
};

export const logout = () => {
  localStorage.removeItem("userData");
  return {
    type: LOGOUT,
  };
};

const saveDataToStorage = (token, userId, expirationData) => {
  localStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationData.toISOString(),
    })
  );
};
