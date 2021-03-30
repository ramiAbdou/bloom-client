import React from 'react';

import Row from '@containers/Row/Row';
import Section from '@containers/Section';
import PaymentAnalyticsPercentPaidCard from './PaymentAnalyticsCard';
import PaymentAnalyticsTotalCollectedCard from './TotalCollectedCard';

const PaymentAnalytics: React.FC = () => (
  <Section>
    <Row spacing="sm">
      <PaymentAnalyticsTotalCollectedCard />
      <PaymentAnalyticsPercentPaidCard />
    </Row>
  </Section>
);

export default PaymentAnalytics;
