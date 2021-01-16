import React from 'react';

import useQuery from '@hooks/useQuery';
import { GET_TOTAL_GROWTH } from '../Analytics.gql';
import SimpleCard from '../AnalyticsStatusCard';

const TotalMembersCard: React.FC = () => {
  const { data, loading } = useQuery({
    name: 'getTotalGrowth',
    query: GET_TOTAL_GROWTH
  });

  if (loading) return null;

  return (
    <SimpleCard label="Total Members" percentage={data[1]} value={data[0]} />
  );
};

export default TotalMembersCard;
