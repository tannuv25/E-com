import { LOGIN_RED, LOGOUT } from "../Constants";

const initialState = {
  user: null,
  isAuthenticated: false,
  errorMessage: "",
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_RED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        errorMessage: "",
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
}
