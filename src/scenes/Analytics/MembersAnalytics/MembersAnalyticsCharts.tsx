import React from 'react';

import MainSection from '@containers/Main/MainSection';
import Row from '@containers/Row/Row';
import MembersAnalyticsActiveMembersChart from './MembersAnalyticsActiveChart';
import MembersAnalyticsTotalMembersChart from './MembersAnalyticsTotalChart';

const MembersAnalyticsCharts: React.FC = () => (
  <MainSection>
    <Row equal columnBreakpoint="T" spacing="sm">
      <MembersAnalyticsTotalMembersChart />
      <MembersAnalyticsActiveMembersChart />
    </Row>
  </MainSection>
);

export default MembersAnalyticsCharts;