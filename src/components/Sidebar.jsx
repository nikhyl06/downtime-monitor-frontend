import React from "react";

const Sidebar = ({ setActiveTab, activeTab }) => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <ul className="space-y-4">
        <li
          className={`cursor-pointer p-2 rounded ${
            activeTab === "DowntimeDay" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("DowntimeDay")}
        >
          Downtime vs Day
        </li>
        <li
          className={`cursor-pointer p-2 rounded ${
            activeTab === "DowntimeMonth" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("DowntimeMonth")}
        >
          Downtime vs Month
        </li>
        <li
          className={`cursor-pointer p-2 rounded ${
            activeTab === "SparePartsMonth"
              ? "bg-gray-700"
              : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("SparePartsMonth")}
        >
          Spare Parts vs Month
        </li>
        <li
          className={`cursor-pointer p-2 rounded ${
            activeTab === "SparePartsDay" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("SparePartsDay")}
        >
          Spare Parts vs Day
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
