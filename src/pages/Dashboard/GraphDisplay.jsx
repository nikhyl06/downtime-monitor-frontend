import React, { Suspense, lazy } from "react";

const DowntimeDay = lazy(() => import("./graphs/DowntimeDay"));
const DowntimeMonth = lazy(() => import("./graphs/DowntimeMonth"));
const SparePartsDay = lazy(() => import("./graphs/SparePartsDay"));
const SparePartsMonth = lazy(() => import("./graphs/SparePartsMonth"));

const GraphDisplay = ({ activeTab, dateLimits }) => {
  return (
    <div className="graph-display">
      {activeTab === "DowntimeDay" && (
        <Suspense fallback={<div>Loading...</div>}>
          <DowntimeDay dateLimits={dateLimits} />
        </Suspense>
      )}
      {activeTab === "DowntimeMonth" && (
        <Suspense fallback={<div>Loading...</div>}>
          <DowntimeMonth dateLimits={dateLimits} />
        </Suspense>
      )}
      {activeTab === "SparePartsMonth" && (
        <Suspense fallback={<div>Loading...</div>}>
          <SparePartsMonth dateLimits={dateLimits} />
        </Suspense>
      )}
      {activeTab === "SparePartsDay" && (
        <Suspense fallback={<div>Loading...</div>}>
          <SparePartsDay dateLimits={dateLimits} />
        </Suspense>
      )}
    </div>
  );
};

export default GraphDisplay;
