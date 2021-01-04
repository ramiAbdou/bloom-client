import React from 'react';

import MembersAnalyticsActiveMembersCard from './ActiveMembersCard';
import MembersAnalyticsActiveMembersChart from './ActiveMembersChart';
import MembersAnalyticsStore from './MembersAnalytics.store';
import MembersAnalyticsPlayground from './Playground';
import MembersAnalyticsTotalMembersCard from './TotalMembersCard';
import MembersAnalyticsTotalMembersChart from './TotalMembersChart';
import {
  useFetchMembersActiveAnalytics,
  useFetchMembersTotalAnalytics
} from './useFetchMembersAnalytics';

const MembersAnalyticsContent: React.FC = () => {
  const isActiveLoading = useFetchMembersActiveAnalytics();
  const isTotalLoading = useFetchMembersTotalAnalytics();

  return (
    <div className="s-analytics-members">
      <div>
        {!isTotalLoading && <MembersAnalyticsTotalMembersCard />}
        {!isActiveLoading && <MembersAnalyticsActiveMembersCard />}
      </div>

      <div>
        {!isTotalLoading && <MembersAnalyticsTotalMembersChart />}
        {!isActiveLoading && <MembersAnalyticsActiveMembersChart />}
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
