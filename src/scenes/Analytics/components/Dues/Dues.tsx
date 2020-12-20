import React from 'react';

import StaticDuesAnalytics from './Static/Static';
import DuesTable from './Table/Table';

export default () => {
  return (
    <div className="s-analytics-dues">
      <StaticDuesAnalytics />
      <DuesTable />
    </div>
  );
};
