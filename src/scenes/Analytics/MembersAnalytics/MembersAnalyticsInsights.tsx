import React from 'react';

import Row from '@components/containers/Row/Row';
import Section from '@components/containers/Section';
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
