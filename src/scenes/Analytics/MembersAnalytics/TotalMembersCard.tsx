import React from 'react';

import SimpleCard from '@scenes/Analytics/AnalyticsStatusCard/AnalyticsStatusCard';
import Members from './MembersAnalytics.store';

export default () => {
  const numMembers = Members.useStoreState(({ totalChartData }) => {
    const { length } = totalChartData;
    return totalChartData[length - 1]?.value;
  });

  const totalGrowth = Members.useStoreState((store) => store.totalGrowth);
  if (totalGrowth === null) return null;

  return (
    <SimpleCard
      label="Total Members"
      percentage={totalGrowth}
      value={numMembers}
    />
  );
};
