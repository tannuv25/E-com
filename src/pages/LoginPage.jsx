import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../Components/HeroSection";
import { loginUser } from "../Redux/ActionCreators/AuthActionCreators";

export default function LoginPage() {
  const [data, setData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.AuthStateData);

  function getInputData(e) {
    const { name, value } = e.target;
    setErrorMessage("");
    setData((old) => ({ ...old, [name]: value }));
  }

  function postData(e) {
    e.preventDefault();
    dispatch(loginUser(data)); // 🔥 Redux Saga handles everything now
  }

  // Redirect after successful login
  if (isAuthenticated) {
    if (user.role === "Buyer") navigate("/profile");
    else navigate("/admin");
  }

  return (
    <>
      <HeroSection title="Login - Login to Your Account" />
      <div className="container-fluid my-3 mb-5">
        <div className="row">
          <div className="col-md-6 col-sm-8 col-10 m-auto">
            <h5 className="bg-primary text-center text-light p-2">
              Login to Your Account
            </h5>
            <form onSubmit={postData}>
              <div className="mb-3">
                <label>User Name*</label>
                <input
                  type="text"
                  name="username"
                  onChange={getInputData}
                  placeholder="User Name or Email Address"
                  className={`form-control border-3 ${
                    errorMessage ? "border-danger" : "border-primary"
                  }`}
                />
                {errorMessage && (
                  <p className="text-danger">{errorMessage}</p>
                )}
              </div>

              <div className="mb-3">
                <label>Password*</label>
                <input
                  type="password"
                  name="password"
                  onChange={getInputData}
                  placeholder="Password"
                  className={`form-control border-3 ${
                    errorMessage ? "border-danger" : "border-primary"
                  }`}
                />
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </div>
            </form>
            <div className="mb-3 d-flex justify-content-between">
              <Link to="#">Forget Password?</Link>
              <Link to="/signup">Doesn't Have an Account? Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
