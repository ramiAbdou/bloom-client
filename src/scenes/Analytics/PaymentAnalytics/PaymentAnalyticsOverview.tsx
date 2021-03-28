import React from 'react';

import MainSection from '@containers/Main/MainSection';
import Row from '@containers/Row/Row';
import PaymentAnalyticsPercentPaidCard from './PaymentAnalyticsCard';
import PaymentAnalyticsTotalCollectedCard from './TotalCollectedCard';

const PaymentAnalytics: React.FC = () => {
  return (
    <MainSection>
      <Row spacing="sm">
        <PaymentAnalyticsTotalCollectedCard />
        <PaymentAnalyticsPercentPaidCard />
      </Row>
    </MainSection>
  );
};

export default PaymentAnalytics;
