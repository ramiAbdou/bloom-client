import React from 'react';

import AnalyticsSimple from '../AnalyticsStatusCard';

const DuesAnalyticsTotalCollectedCard: React.FC = () => {
  const value = 9450;

  return (
    <AnalyticsSimple
      label="Total Dues Collected"
      percentage={8}
      value={`$${value.toLocaleString()}`}
    />
  );
};

export default DuesAnalyticsTotalCollectedCard;
