import React from 'react';

import AnalyticsCard from '@containers/Card/AnalyticsCard';
import useQuery from '@hooks/useQuery';

const DuesAnalyticsTotalCollectedCard: React.FC = () => {
  const { data, loading } = useQuery<number>({
    name: 'getTotalDuesGrowth'
  });

  return (
    <AnalyticsCard
      label="Total Dues Collected"
      show={!loading}
      value={data && `$${data}`}
    />
  );
};

export default DuesAnalyticsTotalCollectedCard;
