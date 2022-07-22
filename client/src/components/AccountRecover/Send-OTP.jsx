import React, { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RecoverVerifyEmailRequest } from "../../APIRequest/APIRequest";
import { ErrorToast, IsEmail, SuccessToast } from "../../helper/FormHelper";

const SendOTP = () => {
  let emailRef = useRef();
  let navigate = useNavigate();
  const VerifyEmail = () => {
    let email = emailRef.value;
    if (IsEmail(email)) {
      ErrorToast("Please enter a valid email address");
    } else {
      RecoverVerifyEmailRequest(email).then((res) => {
        // console.log(res);
        if (res === true) {
          navigate("/VerifyOTP");
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
                <h4>Email Address</h4>
                <br />
                <label>Your Email Address</label>
                <input
                  ref={(input) => (emailRef = input)}
                  placeholder="Enter your email address"
                  className="form-control animated fadeInUp"
                  type="email"
                />
                <br />
                <button
                  onClick={VerifyEmail}
                  className="btn btn-primary w-100 fadeInUp animated float-end"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SendOTP;
