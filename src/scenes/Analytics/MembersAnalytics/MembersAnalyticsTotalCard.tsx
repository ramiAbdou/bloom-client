import React from 'react';

import AnalyticsCard from '@containers/Card/AnalyticsCard';
import useQuery from '@hooks/useQuery';
import { GET_TOTAL_MEMBERS_GROWTH } from '../Analytics.gql';

const MembersAnalyticsTotalCard: React.FC = () => {
  const { data, loading } = useQuery({
    name: 'getTotalMembersGrowth',
    query: GET_TOTAL_MEMBERS_GROWTH
  });

  return (
    <AnalyticsCard
      label="Total Members"
      percentage={data && data[1]}
      show={!loading && data}
      value={data && data[0]}
    />
  );
};

export default MembersAnalyticsTotalCard;
