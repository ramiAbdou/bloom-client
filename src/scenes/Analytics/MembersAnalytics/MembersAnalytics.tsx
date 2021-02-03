import React from 'react';

import MembersAnalyticsCharts from './MembersAnalyticsCharts';
import MembersAnalyticsOverview from './MembersAnalyticsOverview';
import MembersAnalyticsPlayground from './Playground';

const MembersAnalytics: React.FC = () => (
  <div className="s-analytics-page s-analytics-members">
    <MembersAnalyticsOverview />
    <MembersAnalyticsCharts />
    <MembersAnalyticsPlayground />
  </div>
);

export default MembersAnalytics;
