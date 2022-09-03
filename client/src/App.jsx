import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import FullscreenLoader from "./components/masterLayout/Fullscreen-Loader";
import { getToken } from "./helper/SessionHelper";
import CreatePasswordPage from "./pages/AccountRecover/Create-Password-Page";
import SendOTPPage from "./pages/AccountRecover/Send-OTP-Page";
import VerifyOTPPage from "./pages/AccountRecover/Verify-OTP-Page";
import CanceledPage from "./pages/Canceled-Page";
import CompletedPage from "./pages/Completed-Page";
import CreatePage from "./pages/Create-Page";
import DashboardPage from "./pages/Dashboard-Page";
import ForgetpassPage from "./pages/Forgetpass-Page";
import LoginPage from "./pages/Login-Page";
import NewPage from "./pages/New-Page";
import Page404 from "./pages/Page-404";
import ProfilePage from "./pages/Profile-Page";
import ProgressPage from "./pages/Progress-Page";
import RegistrationPage from "./pages/Registration-Page";
const App = () => {
  if (getToken()) {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<DashboardPage />} />
            <Route exact path="/Create" element={<CreatePage />} />
            <Route exact path="/All" element={<NewPage />} />
            <Route exact path="/Progress" element={<ProgressPage />} />
            <Route exact path="/Completed" element={<CompletedPage />} />
            <Route exact path="/Canceled" element={<CanceledPage />} />
            <Route exact path="/Profile" element={<ProfilePage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
        <FullscreenLoader />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/Login" replace />} />
            <Route
              exact
              path="/Create"
              element={<Navigate to="/Login" replace />}
            />
            <Route
              exact
              path="/All"
              element={<Navigate to="/Login" replace />}
            />
            <Route
              exact
              path="/Progress"
              element={<Navigate to="/Login" replace />}
            />
            <Route
              exact
              path="/Completed"
              element={<Navigate to="/Login" replace />}
            />
            <Route
              exact
              path="/Canceled"
              element={<Navigate to="/Login" replace />}
            />
            <Route
              exact
              path="/Profile"
              element={<Navigate to="/Login" replace />}
            />
            <Route path="*" element={<Page404 />} />
            <Route exact path="/Login" element={<LoginPage />} />
            <Route exact path="/Registration" element={<RegistrationPage />} />
            <Route exact path="/Forgetpass" element={<ForgetpassPage />} />
            <Route
              exact
              path="/CreatePassword"
              element={<CreatePasswordPage />}
            />
            <Route exact path="/SendOTP" element={<SendOTPPage />} />
            <Route exact path="/VerifyOTP" element={<VerifyOTPPage />} />
          </Routes>
        </BrowserRouter>
        <FullscreenLoader />
      </Fragment>
    );
  }
};

export default App;
