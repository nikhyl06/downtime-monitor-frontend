import React from 'react';
import DowntimeDay from './graphs/DowntimeDay';
import DowntimeMonth from './graphs/DowntimeMonth';
import SparePartsDay from './graphs/SparePartsDay';
import SparePartsMonth from './graphs/SparePartsMonth';

const GraphDisplay = ({ activeTab, dateLimits }) => {
  return (
    <div className="graph-display">
      {activeTab === 'DowntimeDay' && <DowntimeDay dateLimits={dateLimits} />}
      {activeTab === 'DowntimeMonth' && <DowntimeMonth dateLimits={dateLimits} />}
      {activeTab === 'SparePartsMonth' && <SparePartsMonth dateLimits={dateLimits} />}
      {activeTab === 'SparePartsDay' && <SparePartsDay dateLimits={dateLimits} />}
    </div>
  );
};

export default GraphDisplay;
