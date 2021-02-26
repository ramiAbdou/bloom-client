import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import useQuery from '@hooks/useQuery';

const DuesAnalyticsTotalCollectedCard: React.FC = () => {
  const { data, loading } = useQuery<number>({
    operation: 'getTotalDuesGrowth'
  });

  return (
    <GrayCard
      label="Total Dues Collected"
      show={!loading}
      value={data && `$${data}`}
    />
  );
};

export default DuesAnalyticsTotalCollectedCard;
