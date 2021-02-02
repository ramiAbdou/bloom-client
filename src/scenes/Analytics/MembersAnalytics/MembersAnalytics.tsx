import React from 'react';

import MainSection from '@containers/Main/MainSection';
import MembersAnalyticsActiveMembersCard from './ActiveMembersCard';
import MembersAnalyticsActiveMembersChart from './ActiveMembersChart';
import MembersAnalyticsPlayground from './Playground';
import MembersAnalyticsTotalMembersCard from './TotalMembersCard';
import MembersAnalyticsTotalMembersChart from './TotalMembersChart';

const MembersAnalytics: React.FC = () => (
  <div className="s-analytics-page s-analytics-members">
    <MainSection className="flex-ac t-row--spacing-sm">
      <MembersAnalyticsTotalMembersCard />
      <MembersAnalyticsActiveMembersCard />
    </MainSection>

    <MainSection className="flex-acsb t-row--equal t-row--spacing-sm">
      <MembersAnalyticsTotalMembersChart />
      <MembersAnalyticsActiveMembersChart />
    </MainSection>

    <MembersAnalyticsPlayground />
  </div>
);

export default MembersAnalytics;
