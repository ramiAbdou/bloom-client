import React from 'react';

import AnalyticsSimple from '@scenes/Analytics/components/SimpleCard';

export default () => {
  return (
    <AnalyticsSimple
      label="Percent of Members Paid"
      percentage={-8}
      value="94.5%"
    />
  );
};
