import React from "react";
import { Suspense, lazy } from "react";
import LazyLoader from "../components/masterLayout/LazyLoader";
import MasterLayout from "../components/masterLayout/Master-Layout";
const Dashboard = lazy(() => import("../components/Dashboard/Dashboard"));
const DashboardPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <Dashboard />
      </Suspense>
    </MasterLayout>
  );
};

export default DashboardPage;
