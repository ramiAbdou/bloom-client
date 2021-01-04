import React from 'react';

import AnalyticsSimple from '@scenes/Analytics/AnalyticsStatusCard/AnalyticsStatusCard';

export default () => {
  return (
    <AnalyticsSimple
      label="Percent of Members Paid"
      percentage={-8}
      value="94.5%"
    />
  );
};
