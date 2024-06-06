import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Sidebar from "../../components/Sidebar";
import GraphDisplay from "./GraphDisplay";

const Dashboard = () => {
  const axios = useAxiosPrivate();
  const [dateLimits, setDateLimits] = useState({
    oldestYear: 0,
    oldestMonth: 0,
    latestYear: 0,
    latestMonth: 0,
  });
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getDates = async () => {
      axios
        .get("getTimeLimits", { signal: controller.signal })
        .then((response) => {
          isMounted && setDateLimits(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the data!", error);
          // navigate('/login', {state: {from: location}, replace: true});
        });
    };
    getDates();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  const [activeTab, setActiveTab] = useState("DowntimeDay");
  return (
    <div className="flex rounded-xl overflow-hidden h-full">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="flex-grow p-6 bg-gray-100">
        <GraphDisplay activeTab={activeTab} dateLimits={dateLimits} />
      </div>
    </div>
  );
};

export default Dashboard;
