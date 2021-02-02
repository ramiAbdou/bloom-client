import React from 'react';

import MainSection from '@containers/Main/MainSection';
import Row from '@containers/Row/Row';
import MembersAnalyticsActiveMembersCard from './ActiveMembersCard';
import MembersAnalyticsActiveMembersChart from './ActiveMembersChart';
import MembersAnalyticsPlayground from './Playground';
import MembersAnalyticsTotalMembersCard from './TotalMembersCard';
import MembersAnalyticsTotalMembersChart from './TotalMembersChart';

const MembersAnalytics: React.FC = () => (
  <div className="s-analytics-page s-analytics-members">
    <MainSection>
      <Row columnBreakpoint="M" spacing="sm">
        <MembersAnalyticsTotalMembersCard />
        <MembersAnalyticsActiveMembersCard />
      </Row>
    </MainSection>

    <MainSection>
      <Row equal columnBreakpoint="T" spacing="sm">
        <MembersAnalyticsTotalMembersChart />
        <MembersAnalyticsActiveMembersChart />
      </Row>
    </MainSection>

    <MembersAnalyticsPlayground />
  </div>
);

export default MembersAnalytics;
