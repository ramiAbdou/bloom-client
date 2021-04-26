import React from 'react';

import Row from '@components/containers/Row/Row';
import Section from '@components/containers/Section';
import MembersAnalyticsActiveMembersCard from './MembersAnalyticsActiveCard';
import MembersAnalyticsTotalMembersCard from './MembersAnalyticsTotalCard';

const MembersAnalyticsOverviewSection: React.FC = () => (
  <Section>
    <Row wrap gap="xs">
      <MembersAnalyticsTotalMembersCard count={100} />
      <MembersAnalyticsActiveMembersCard count={100} />
    </Row>
  </Section>
);

export default MembersAnalyticsOverviewSection;
