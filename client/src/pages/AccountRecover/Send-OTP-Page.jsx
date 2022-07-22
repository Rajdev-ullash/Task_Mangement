import React, { Fragment, lazy, Suspense } from "react";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const SendOTP = lazy(() => import("../../components/AccountRecover/Send-OTP"));
const SendOTPPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<LazyLoader />}>
        <SendOTP />
      </Suspense>
    </Fragment>
  );
};

export default SendOTPPage;
