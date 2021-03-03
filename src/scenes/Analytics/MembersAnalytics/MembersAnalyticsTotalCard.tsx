import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import useQuery from '@hooks/useQuery';

const MembersAnalyticsTotalCard: React.FC = () => {
  const { data, loading } = useQuery<[number, number]>({
    operation: 'getTotalMembersGrowth'
  });

  return (
    <GrayCard
      label="Total Members"
      percentage={data && data[1]}
      show={!loading && !!data}
      value={data && data[0]}
    />
  );
};

export default MembersAnalyticsTotalCard;
