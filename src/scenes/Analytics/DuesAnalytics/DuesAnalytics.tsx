import React from 'react';

import DuesAnalyticsMembersPaidTable from './MembersPaidTable';
import DuesAnalyticsPercentPaidCard from './PercentPaidCard';
import DuesAnalyticsTotalCollectedCard from './TotalCollectedCard';
import DuesAnalyticsTotalCollectedChart from './TotalCollectedChart';

const DuesAnalytics: React.FC = () => (
  <div className="s-analytics-dues">
    <div>
      <DuesAnalyticsTotalCollectedCard />
      <DuesAnalyticsPercentPaidCard />
    </div>

    <DuesAnalyticsTotalCollectedChart />
    <DuesAnalyticsMembersPaidTable />
  </div>
);

export default DuesAnalytics;
