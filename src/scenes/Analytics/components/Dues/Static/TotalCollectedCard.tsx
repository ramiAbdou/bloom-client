import React from 'react';

import AnalyticsSimple from '../../SimpleCard';

export default () => {
  const value = 9450;

  return (
    <AnalyticsSimple
      label="Total Dues Collected"
      percentage={8}
      value={`$${value.toLocaleString()}`}
    />
  );
};
