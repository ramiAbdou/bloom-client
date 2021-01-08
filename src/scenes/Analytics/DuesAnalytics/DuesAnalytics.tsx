import React from 'react';

import DuesAnalyticsChart from './DuesAnalyticsChart';
import DuesAnalyticsHistory from './DuesAnalyticsHistory';
import DuesAnalyticsPercentPaidCard from './PercentPaidCard';
import DuesAnalyticsTotalCollectedCard from './TotalCollectedCard';

const DuesAnalytics: React.FC = () => (
  <div className="s-analytics-dues">
    <div>
      <DuesAnalyticsTotalCollectedCard />
      <DuesAnalyticsPercentPaidCard />
    </div>

    <DuesAnalyticsChart />
    <DuesAnalyticsHistory />
  </div>
);

export default DuesAnalytics;
