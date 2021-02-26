import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import useQuery from '@hooks/useQuery';

const DuesAnalyticsPercentPaidCard: React.FC = () => {
  const { data, loading } = useQuery<number>({
    operation: 'getActiveDuesGrowth'
  });

  return (
    <GrayCard
      label="Percent of Members Paid"
      show={!loading}
      value={data && `${data}%`}
    />
  );
};

export default DuesAnalyticsPercentPaidCard;
