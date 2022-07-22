import React, { Fragment, lazy, Suspense } from "react";
import LazyLoader from "../../components/masterLayout/LazyLoader";
const CreatePassword = lazy(() =>
  import("../../components/AccountRecover/Create-Password")
);
const CreatePasswordPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<LazyLoader />}>
        <CreatePassword />
      </Suspense>
    </Fragment>
  );
};

export default CreatePasswordPage;
