import React from 'react';

import AnalyticsCard from '@containers/Card/AnalyticsCard';
import useQuery from '@hooks/useQuery';

const DuesAnalyticsPercentPaidCard: React.FC = () => {
  const { data, loading } = useQuery<number>({
    name: 'getActiveDuesGrowth'
  });

  return (
    <AnalyticsCard
      label="Percent of Members Paid"
      show={!loading}
      value={data && `${data}%`}
    />
  );
};

export default DuesAnalyticsPercentPaidCard;
