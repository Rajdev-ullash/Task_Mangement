import React, { Fragment, lazy, Suspense } from "react";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const VerifyOTP = lazy(() =>
  import("../../components/AccountRecover/Verify-OTP")
);
const VerifyOTPPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<LazyLoader />}>
        <VerifyOTP />
      </Suspense>
    </Fragment>
  );
};

export default VerifyOTPPage;
