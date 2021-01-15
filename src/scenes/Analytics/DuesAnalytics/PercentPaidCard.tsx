import React from 'react';

import AnalyticsSimple from '../AnalyticsStatusCard';

const DuesAnalyticsPercentPaidCard: React.FC = () => {
  return (
    <AnalyticsSimple
      label="Percent of Members Paid"
      percentage={100}
      value="1"
    />
  );
};

export default DuesAnalyticsPercentPaidCard;
