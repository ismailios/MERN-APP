import { AUTHENTICATE, LOGIN, LOGOUT, SIGNUP } from "./actions";

const initialState = {
  userId: null,
  token: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {};

    case AUTHENTICATE:
      return {
        userId: action.userId,
        token: action.token,
      };
    case LOGOUT:
      return {
        initialState,
      };

    default:
      return state;
  }
};
