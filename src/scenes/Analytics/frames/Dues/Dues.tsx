import React from 'react';

import StaticDuesAnalytics from './components/Static/Static';
import DuesTable from './components/Table';

export default () => {
  return (
    <div className="s-analytics-dues">
      <StaticDuesAnalytics />
      <DuesTable />
    </div>
  );
};
