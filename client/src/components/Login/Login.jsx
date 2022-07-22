import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import { LoginRequest } from "../../APIRequest/APIRequest";
import { ErrorToast, IsEmail, IsEmpty } from "../../helper/FormHelper";

const Login = () => {
  let emailRef,
    passRef = useRef();
  let handleLogin = () => {
    let email = emailRef.value;
    let pass = passRef.value;
    if (IsEmail(email)) {
      ErrorToast("Invalid email");
    } else if (IsEmpty(pass)) {
      ErrorToast("Password is required");
    } else {
      LoginRequest(email, pass).then((res) => {
        if (res === true) {
          window.location.href = "/";
        }
      });
    }
  };
  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90 p-4">
              <div className="card-body">
                <h5>Login</h5>
                <br />
                <input
                  type="email"
                  ref={(input) => (emailRef = input)}
                  className="form-control animated fadeInUp"
                  placeholder="User Email"
                />
                <br />
                <input
                  type="password"
                  ref={(input) => (passRef = input)}
                  className="form-control animated fadeInUp"
                  placeholder="User Password"
                />
                <br />
                <button
                  onClick={handleLogin}
                  className="btn w-100 btn-primary float-end animated fadeInUp"
                >
                  Next
                </button>
                <div className="w-100 text-center">
                  <Link
                    className="text-center animated fadeInUp"
                    to="/Registration"
                  >
                    Registration
                  </Link>
                  <br />
                  <Link className="text-center animated fadeInUp" to="/SendOTP">
                    Forget Password
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
