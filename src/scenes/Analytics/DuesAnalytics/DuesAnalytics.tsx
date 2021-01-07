import React from 'react';

import DuesAnalyticsHistory from './DuesAnalyticsHistory';
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
    <DuesAnalyticsHistory />
  </div>
);

export default DuesAnalytics;
