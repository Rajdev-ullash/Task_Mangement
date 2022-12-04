import React, { Fragment, Suspense, lazy } from "react";
import LazyLoader from "../components/masterLayout/LazyLoader";
import MasterLayout from "../components/masterLayout/Master-Layout";
const Priority = lazy(() => import("../components/Priority/Priority"));
const PriorityPage = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Priority />
        </Suspense>
      </MasterLayout>
    </Fragment>
  );
};

export default PriorityPage;
