import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
          <Route exact path="/Login" element={<LoginPage />} />
          <Route exact path="/Registration" element={<RegistrationPage />} />
          <Route exact path="/Forgetpass" element={<ForgetpassPage />} />
          <Route exact path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
