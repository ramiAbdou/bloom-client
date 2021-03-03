import React from 'react';

import DuesAnalyticsChart from './DuesAnalyticsChart';
import DuesAnalyticsHistory from './DuesAnalyticsHistory';
import DuesAnalyticsOverview from './DuesAnalyticsOverview';

const DuesAnalytics: React.FC = () => (
  <>
    <DuesAnalyticsOverview />
    <DuesAnalyticsChart />
    <DuesAnalyticsHistory />
  </>
);

export default DuesAnalytics;
