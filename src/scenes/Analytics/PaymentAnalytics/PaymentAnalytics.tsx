import React from 'react';

import PaymentAnalyticsChart from './PaymentAnalyticsChart';
import PaymentAnalyticsHistory from './PaymentAnalyticsHistory';
import PaymentAnalyticsOverview from './PaymentAnalyticsOverview';

const PaymentAnalytics: React.FC = () => {
  return (
    <>
      <PaymentAnalyticsOverview />
      <PaymentAnalyticsChart />
      <PaymentAnalyticsHistory />
    </>
  );
};

export default PaymentAnalytics;
