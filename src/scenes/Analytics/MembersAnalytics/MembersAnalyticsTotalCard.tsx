import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import useCustomQuery from '@gql/hooks/useCustomQuery';

interface GetMembersGrowthResult {
  count: number;
  growth: number;
}

const MembersAnalyticsTotalCard: React.FC = () => {
  const { data, loading } = useCustomQuery<GetMembersGrowthResult>({
    fields: ['count', 'growth'],
    queryName: 'getMembersGrowth'
  });

  return (
    <GrayCard
      label="Total Members"
      percentage={data && data?.growth}
      show={!loading && !!data}
      value={data && data?.count}
    />
  );
};

export default MembersAnalyticsTotalCard;
