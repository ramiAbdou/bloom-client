import React from 'react';

import MembersAnalyticsCharts from './MembersAnalyticsCharts';
import MembersAnalyticsInsights from './MembersAnalyticsInsights';
import MembersAnalyticsPlayground from './MembersAnalyticsPlayground';

const MembersAnalytics: React.FC = () => (
  <div className="s-analytics-page s-analytics-members">
    <MembersAnalyticsInsights />
    <MembersAnalyticsCharts />
    <MembersAnalyticsPlayground />
  </div>
);

export default MembersAnalytics;
