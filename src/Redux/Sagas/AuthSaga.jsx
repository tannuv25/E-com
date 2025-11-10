import { put, takeEvery } from "redux-saga/effects";
import { LOGIN, LOGIN_RED } from "../Constants";
import { getRecord } from "./Service/ApiCallingService";

function* loginSaga(action) {
  try {
    // Get all users
    let response = yield getRecord("user");

    // Find matching user (same logic you had in LoginPage)
    let item = response.find(
      (x) =>
        (x.username === action.payload.username ||
          x.email === action.payload.username) &&
        x.password === action.payload.password
    );

    if (item && item.active === false) {
      alert(
        "Your account is not active. Please contact admin to activate your account."
      );
      return;
    } else if (item) {
      // Save to localStorage
      localStorage.setItem("login", true);
      localStorage.setItem("name", item.name);
      localStorage.setItem("userid", item._id);
      localStorage.setItem("role", item.role);

      yield put({ type: LOGIN_RED, payload: item });
    } else {
      alert("Invalid Username or Password");
    }
  } catch (error) {
    console.log("Login Error:", error);
    alert("Internal Server Error");
  }
}

export default function* AuthSagas() {
  yield takeEvery(LOGIN, loginSaga);
}
