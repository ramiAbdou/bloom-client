import React from 'react';

import Row from '@containers/Row/Row';
import Section from '@containers/Section';
import MembersAnalyticsActiveMembersCard from './MembersAnalyticsActiveCard';
import MembersAnalyticsTotalMembersCard from './MembersAnalyticsTotalCard';

const MembersAnalyticsInsights: React.FC = () => (
  <Section>
    <Row wrap gap="xs">
      <MembersAnalyticsTotalMembersCard />
      <MembersAnalyticsActiveMembersCard />
    </Row>
  </Section>
);

export default MembersAnalyticsInsights;
