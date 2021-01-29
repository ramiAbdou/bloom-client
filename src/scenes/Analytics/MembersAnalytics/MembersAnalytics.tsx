import React from 'react';

import Row from '@containers/Row/Row';
import MembersAnalyticsActiveMembersCard from './ActiveMembersCard';
import MembersAnalyticsActiveMembersChart from './ActiveMembersChart';
import MembersAnalyticsPlayground from './Playground';
import MembersAnalyticsTotalMembersCard from './TotalMembersCard';
import MembersAnalyticsTotalMembersChart from './TotalMembersChart';

const MembersAnalytics: React.FC = () => (
  <div className="s-analytics-page s-analytics-members">
    <Row spacing="sm">
      <MembersAnalyticsTotalMembersCard />
      <MembersAnalyticsActiveMembersCard />
    </Row>

    <div>
      <MembersAnalyticsTotalMembersChart />
      <MembersAnalyticsActiveMembersChart />
    </div>

    <MembersAnalyticsPlayground />
  </div>
);

export default MembersAnalytics;
