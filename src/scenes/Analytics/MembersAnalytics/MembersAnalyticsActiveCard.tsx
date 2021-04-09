import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import useCustomQuery from '@gql/useCustomQuery';

interface GetActiveMembersGrowthResult {
  count: number;
  growth: number;
}

const MembersAnalyticsActiveCard: React.FC = () => {
  const { data, loading } = useCustomQuery<GetActiveMembersGrowthResult>({
    fields: ['count', 'growth'],
    queryName: 'getActiveMembersGrowth'
  });

  return (
    <GrayCard
      label="Active Users"
      percentage={data && data?.growth}
      show={!loading}
      value={data && data?.count}
    />
  );
};

export default MembersAnalyticsActiveCard;
