import React from 'react';

import MembersAnalyticsPlayground from './Playground';
import StaticMemberAnalytics from './Static/Static';

const MembersAnalytics: React.FC = () => (
  <div className="s-analytics-members">
    <StaticMemberAnalytics />
    <MembersAnalyticsPlayground />
  </div>
);

export default MembersAnalytics;
