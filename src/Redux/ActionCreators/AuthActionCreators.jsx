import { LOGIN, LOGOUT } from "../Constants";

export function loginUser(data) {
  return {
    type: LOGIN,
    payload: data,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT,
  };
}
