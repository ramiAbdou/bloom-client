import React from 'react';

import AnalyticsSimple from '@scenes/Analytics/components/SimpleCard';
import Members from '../Members.store';

export default () => {
  const numActiveUsers = Members.useStoreState(({ activeChartData }) => {
    const { length } = activeChartData;
    return activeChartData[length - 1]?.value;
  });

  const activeGrowth = Members.useStoreState((store) => store.activeGrowth);
  if (activeGrowth === null) return null;

  return (
    <AnalyticsSimple
      label="Active Users in Last 30 Days"
      percentage={activeGrowth}
      value={numActiveUsers}
    />
  );
};