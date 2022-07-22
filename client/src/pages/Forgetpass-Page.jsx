import React, { Fragment, Suspense, lazy } from "react";
import LazyLoader from "../components/masterLayout/LazyLoader";
const Forgetpass = lazy(() => import("../components/Forgetpass/Forgetpass"));
const ForgetpassPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<LazyLoader />}>
        <Forgetpass />
      </Suspense>
    </Fragment>
  );
};

export default ForgetpassPage;
