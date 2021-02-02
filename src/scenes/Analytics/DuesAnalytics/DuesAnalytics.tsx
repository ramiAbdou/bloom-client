import React from 'react';

import DuesAnalyticsChart from './DuesAnalyticsChart';
import DuesAnalyticsHistory from './DuesAnalyticsHistory';
import DuesAnalyticsOverview from './DuesAnalyticsOverview';

const DuesAnalytics: React.FC = () => (
  <div className="s-analytics-dues">
    <DuesAnalyticsOverview />
    <DuesAnalyticsChart />
    <DuesAnalyticsHistory />
  </div>
);

export default DuesAnalytics;
