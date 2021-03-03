import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import useQuery from '@hooks/useQuery';

const MembersAnalyticsActiveCard: React.FC = () => {
  const { data, loading } = useQuery<[number, number]>({
    operation: 'getActiveMembersGrowth'
  });

  return (
    <GrayCard
      label="Active Users"
      percentage={data && data[1]}
      show={!loading}
      value={data && data[0]}
    />
  );
};

export default MembersAnalyticsActiveCard;
