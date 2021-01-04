import React from 'react';

import MembersAnalyticsActiveMembersCard from './ActiveMembersCard';
import MembersAnalyticsActiveMembersChart from './ActiveMembersChart';
import MembersAnalyticsStore from './MembersAnalytics.store';
import MembersAnalyticsPlayground from './Playground';
import MembersAnalyticsTotalMembersCard from './TotalMembersCard';
import MembersAnalyticsTotalMembersChart from './TotalMembersChart';
import useFetchMembersAnalytics from './useFetchMembersAnalytics';

const MembersAnalyticsContent: React.FC = () => {
  useFetchMembersAnalytics();

  return (
    <div className="s-analytics-members">
      <div>
        <MembersAnalyticsTotalMembersCard />
        <MembersAnalyticsActiveMembersCard />
      </div>

      <div>
        <MembersAnalyticsTotalMembersChart />
        <MembersAnalyticsActiveMembersChart />
      </div>

      <MembersAnalyticsPlayground />
    </div>
  );
};

const MembersAnalytics: React.FC = () => (
  <MembersAnalyticsStore.Provider>
    <MembersAnalyticsContent />
  </MembersAnalyticsStore.Provider>
);

export default MembersAnalytics;
