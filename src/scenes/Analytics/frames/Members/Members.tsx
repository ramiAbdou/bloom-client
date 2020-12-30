import React from 'react';

import PlaygroundAnalytics from './Playground/Playground';
import StaticMemberAnalytics from './Static/Static';

export default () => (
  <div className="s-analytics-members">
    <StaticMemberAnalytics />
    <PlaygroundAnalytics />
  </div>
);
