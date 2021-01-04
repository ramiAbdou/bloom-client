import React from 'react';

import AnalyticsSimple from '@scenes/Analytics/AnalyticsStatusCard/AnalyticsStatusCard';

const DuesAnalyticsPercentPaidCard: React.FC = () => {
  return (
    <AnalyticsSimple
      label="Percent of Members Paid"
      percentage={-8}
      value="94.5%"
    />
  );
};

export default DuesAnalyticsPercentPaidCard;
