import React from 'react';

import AnalyticsSimple from '@scenes/Analytics/components/SimpleCard';

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
