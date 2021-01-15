import React from 'react';

import AnalyticsSimple from '../AnalyticsStatusCard';

const DuesAnalyticsPercentPaidCard: React.FC = () => {
  return (
    <AnalyticsSimple
      label="Percent of Members Paid"
      percentage={130}
      value="1.3%"
    />
  );
};

export default DuesAnalyticsPercentPaidCard;
