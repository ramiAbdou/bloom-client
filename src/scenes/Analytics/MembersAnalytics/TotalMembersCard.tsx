import React from 'react';

import AnalyticsCard from '@containers/Card/AnalyticsCard';
import useQuery from '@hooks/useQuery';
import { GET_TOTAL_MEMBERS_GROWTH } from '../Analytics.gql';

const TotalMembersCard: React.FC = () => {
  const { data, loading } = useQuery({
    name: 'getTotalMembersGrowth',
    query: GET_TOTAL_MEMBERS_GROWTH
  });

  if (loading || !data) return null;

  return (
    <AnalyticsCard label="Total Members" percentage={data[1]} value={data[0]} />
  );
};

export default TotalMembersCard;
