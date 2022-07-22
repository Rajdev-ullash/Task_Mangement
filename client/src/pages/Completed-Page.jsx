import React, { Fragment, Suspense, lazy } from "react";
import LazyLoader from "../components/masterLayout/LazyLoader";
import MasterLayout from "../components/masterLayout/Master-Layout";
const Completed = lazy(() => import("../components/Completed/Completed"));

const CompletedPage = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Completed />
        </Suspense>
      </MasterLayout>
    </Fragment>
  );
};

export default CompletedPage;
