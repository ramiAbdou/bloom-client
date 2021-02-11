import React from 'react';

import AnalyticsCard from '@containers/Card/AnalyticsCard';
import useQuery from '@hooks/useQuery';

const MembersAnalyticsActiveCard: React.FC = () => {
  const { data, loading } = useQuery<[number, number]>({
    name: 'getActiveMembersGrowth'
  });

  return (
    <AnalyticsCard
      label="Active Users"
      percentage={data && data[1]}
      show={!loading}
      value={data && data[0]}
    />
  );
};

export default MembersAnalyticsActiveCard;
