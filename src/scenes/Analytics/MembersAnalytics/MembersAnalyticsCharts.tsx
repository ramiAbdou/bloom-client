import React from 'react';

import Row from '@components/containers/Row/Row';
import Section from '@components/containers/Section';
import MembersAnalyticsActiveMembersChart from './MembersAnalyticsActiveChart';
import MembersAnalyticsTotalMembersChart from './MembersAnalyticsTotalChart';

const MembersAnalyticsCharts: React.FC = () => (
  <Section>
    <Row wrap gap="sm">
      <MembersAnalyticsTotalMembersChart />
      <MembersAnalyticsActiveMembersChart />
    </Row>
  </Section>
);

export default MembersAnalyticsCharts;
