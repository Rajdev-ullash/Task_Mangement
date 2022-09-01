import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import {
  getToken,
  setEmail,
  setOTP,
  setToken,
  setUserDetails,
} from "../helper/SessionHelper";
import { SetProfile } from "../redux/state-slice/profile-slice";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import { SetSummary } from "../redux/state-slice/summary-slice";
import {
  setCanceledTask,
  setCompletedTask,
  setNewTask,
  setProgressTask,
} from "../redux/state-slice/task-slice";
import store from "../redux/store/store";
// const BaseURL = "http://localhost:5000/api/v1";
const BaseURL = "https://taskmanager.rajdevullash.com/api/v1";
const AxiosHeader = { headers: { token: getToken() } };

export function RegistrationRequest(
  email,
  firstName,
  lastName,
  phone,
  password,
  photo
) {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/registration";

  let PostBody = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    password: password,
    photo: photo,
  };
  //   var config = {
  //     method: "post",
  //     url: BaseURL + "/registration",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: JSON.stringify(PostBody),
  //   };
  return axios
    .post(URL, PostBody)
    .then((res) => {
      console.log(res);
      store.dispatch(HideLoader());
      if (res.status === 200) {
        if (res.data["status"] == "fail") {
          if (res.data["err"]["keyPattern"]["email"] === 1) {
            ErrorToast("Email already exists");
            return false;
          } else {
            ErrorToast("Something went wrong");
            return false;
          }
        } else {
          SuccessToast("Registration Successful");
          return true;
        }
      } else {
        ErrorToast("Something went wrong");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      console.log(err);
      ErrorToast("Something went wrong");
      return false;
    });
}

export function LoginRequest(email, password) {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/login";

  let PostBody = {
    email: email,
    password: password,
  };

  return axios
    .post(URL, PostBody)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200) {
        setToken(res.data["token"]);
        setUserDetails(res.data["data"]);
        SuccessToast("Login Successful");
        return true;
      } else {
        ErrorToast("Invalid email or password");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      ErrorToast("Something went wrong");
      return false;
    });
}

export function NewTaskRequest(title, description) {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/createTask";

  let PostBody = {
    title: title,
    description: description,
    status: "New",
  };

  return axios
    .post(URL, PostBody, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200) {
        SuccessToast("Task Created");
        return true;
      } else {
        ErrorToast("Something went wrong");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      ErrorToast("Something went wrong");
      return false;
    });
}

export function TaskListByStatus(Status) {
  store.dispatch(ShowLoader());
  var URL = BaseURL + "/listTasksByStatus/" + Status;
  return axios
    .get(URL, AxiosHeader)
    .then((result) => {
      console.log(result);
      store.dispatch(HideLoader());
      if (result.status === 200) {
        if (Status === "New") {
          store.dispatch(setNewTask(result.data["data"]));
        } else if (Status === "Completed") {
          store.dispatch(setCompletedTask(result.data["data"]));
        } else if (Status === "Canceled") {
          store.dispatch(setCanceledTask(result.data["data"]));
        } else if (Status === "Progress") {
          store.dispatch(setProgressTask(result.data["data"]));
        }
      } else {
        ErrorToast("Something went wrong");
      }
    })
    .catch((error) => {
      store.dispatch(HideLoader());
      ErrorToast("Something went wrong");
    });
}

export function SummaryRequest() {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/taskStatusCount";
  axios
    .get(URL, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200) {
        store.dispatch(SetSummary(res.data["data"]));
      } else {
        ErrorToast("Something went wrong");
      }
    })
    .catch((error) => {
      store.dispatch(HideLoader());
      ErrorToast("Something went wrong");
    });
}

export function DeleteRequest(id) {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/deleteTask/" + id;
  return axios
    .delete(URL, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200) {
        SuccessToast("Task Deleted");
        return true;
      } else {
        ErrorToast("Something went wrong");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      ErrorToast("Something went wrong");
      return false;
    });
}

export function UpdateStatusRequest(id, status) {
  console.log(id, status);
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/updateTaskStatus/" + id + "/" + status;
  return axios
    .get(URL, AxiosHeader)
    .then((res) => {
      console.log(res);
      store.dispatch(HideLoader());
      if (res.status === 200) {
        SuccessToast("Task Status Updated");
        return true;
      } else {
        ErrorToast("Something went wrong");
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      store.dispatch(HideLoader());
      ErrorToast("Something went wrong");
      return false;
    });
}

export function GetProfileDetails() {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/profileDetails";
  return axios
    .get(URL, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200) {
        store.dispatch(SetProfile(res.data["data"][0]));
      } else {
        ErrorToast("Something went wrong");
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      ErrorToast("Something went wrong");
    });
}

export function ProfileUpdateRequest(
  email,
  firstName,
  lastName,
  mobile,
  password,
  photo
) {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/profileUpdate";
  let PostBody = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    phone: mobile,
    password: password,
    photo: photo,
  };
  let UserDetails = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    phone: mobile,
    photo: photo,
  };
  return axios
    .put(URL, PostBody, AxiosHeader)
    .then((res) => {
      console.log(res);
      store.dispatch(HideLoader());
      if (res.status === 200) {
        SuccessToast("Profile Updated");
        setUserDetails(UserDetails);
        return true;
      } else {
        ErrorToast("Something went wrong");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      ErrorToast("Something went wrong");
      return false;
    });
}

export function RecoverVerifyEmailRequest(email) {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/RecoverVerifyEmail/" + email;
  return axios
    .get(URL)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200) {
        if (res.data["status"] === "fail") {
          ErrorToast("User not found");
          return false;
        } else {
          setEmail(email);
          SuccessToast(
            "Email has been successfully sent. please check your inbox or spam"
          );
          return true;
        }
      } else {
        ErrorToast("Something went wrong");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      ErrorToast("Something went wrong");
      return false;
    });
}

export function RecoverVerifyOTPRequest(email, OTP) {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/RecoverVerifyOTP/" + email + "/" + OTP;
  return axios
    .get(URL)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200) {
        if (res.data["status"] === "fail") {
          ErrorToast("OTP Invalid");
          return false;
        } else {
          setOTP(OTP);
          SuccessToast("Code Verification Success");
          return true;
        }
      } else {
        ErrorToast("Something went wrong");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      ErrorToast("Something went wrong");
      return false;
    });
}

export function RecoverResetPassRequest(email, OTP, password) {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/RecoverResetPass";
  let PostBody = { email: email, OTP: OTP, password: password };
  return axios
    .post(URL, PostBody)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200) {
        if (res.data["status"] === "fail") {
          ErrorToast("OTP Invalid");
          return false;
        } else {
          // setOTP(OTP);
          SuccessToast("New Password Created");
          return true;
        }
      } else {
        ErrorToast("Something went wrong");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      ErrorToast("Something went wrong");
      return false;
    });
}
