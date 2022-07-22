import React, { Fragment, useEffect, useRef } from "react";
import {
  GetProfileDetails,
  ProfileUpdateRequest,
} from "../../APIRequest/APIRequest";
import { useSelector } from "react-redux";
import {
  ErrorToast,
  getBase64,
  IsEmail,
  IsEmpty,
  IsMobile,
} from "../../helper/FormHelper";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  let emailRef,
    firstNameRef,
    lastNameRef,
    mobileRef,
    passwordRef,
    userImgRef,
    userImgView = useRef();
  useEffect(() => {
    GetProfileDetails();
  }, []);

  const ProfileData = useSelector((state) => state.profile.value);

  let navigate = useNavigate();

  const PreviewImage = () => {
    let ImgFile = userImgRef.files[0];
    getBase64(ImgFile).then((data) => {
      userImgView.src = data;
    });
  };

  const UpdateMyProfile = () => {
    let email = emailRef.value;
    let firstName = firstNameRef.value;
    let lastName = lastNameRef.value;
    let mobile = mobileRef.value;
    let password = passwordRef.value;
    let photo = userImgView.src;
    if (IsEmail(email)) {
      ErrorToast("Email is not valid");
    } else if (IsEmpty(firstName)) {
      ErrorToast("First name is required");
    } else if (IsEmpty(lastName)) {
      ErrorToast("Last name is required");
    } else if (!IsMobile(mobile)) {
      ErrorToast("11 digit Mobile number is required & start from 01");
    } else if (IsEmpty(password)) {
      ErrorToast("Password is required");
    } else {
      ProfileUpdateRequest(
        email,
        firstName,
        lastName,
        mobile,
        password,
        photo
      ).then((result) => {
        if (result === true) {
          navigate("/");
        }
      });
    }
  };
  return (
    <Fragment>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="container-fluid">
                  <img
                    ref={(input) => (userImgView = input)}
                    className="icon-nav-img-lg"
                    src={ProfileData["photo"]}
                    alt=""
                    style={{
                      width: "85px",
                      height: "85px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <hr />
                  <div className="row">
                    <div className="col-4 p-2">
                      <label>Profile Picture</label>
                      <input
                        onChange={PreviewImage}
                        ref={(input) => (userImgRef = input)}
                        placeholder="User Email"
                        className="form-control animated fadeInUp"
                        type="file"
                      />
                    </div>
                    <div className="col-4 p-2">
                      <label>Email Address</label>
                      <input
                        key={Date.now()}
                        defaultValue={ProfileData["email"]}
                        readOnly={true}
                        ref={(input) => (emailRef = input)}
                        placeholder="User Email"
                        className="form-control animated fadeInUp"
                        type="email"
                      />
                    </div>
                    <div className="col-4 p-2">
                      <label>First Name</label>
                      <input
                        key={Date.now()}
                        defaultValue={ProfileData["firstName"]}
                        ref={(input) => (firstNameRef = input)}
                        placeholder="First Name"
                        className="form-control animated fadeInUp"
                        type="text"
                      />
                    </div>
                    <div className="col-4 p-2">
                      <label>Last Name</label>
                      <input
                        key={Date.now()}
                        defaultValue={ProfileData["lastName"]}
                        ref={(input) => (lastNameRef = input)}
                        placeholder="Last Name"
                        className="form-control animated fadeInUp"
                        type="text"
                      />
                    </div>
                    <div className="col-4 p-2">
                      <label>Mobile</label>
                      <input
                        key={Date.now()}
                        defaultValue={ProfileData["phone"]}
                        ref={(input) => (mobileRef = input)}
                        placeholder="Mobile"
                        className="form-control animated fadeInUp"
                        type="mobile"
                      />
                    </div>
                    <div className="col-4 p-2">
                      <label>Password</label>
                      <input
                        key={Date.now()}
                        defaultValue={ProfileData["password"]}
                        ref={(input) => (passwordRef = input)}
                        placeholder="User Password"
                        className="form-control animated fadeInUp"
                        type="password"
                      />
                    </div>
                    <div className="col-4 p-2">
                      <button
                        onClick={UpdateMyProfile}
                        className="btn w-100 float-end btn-primary animated fadeInUp"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
