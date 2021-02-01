import React from 'react';

import AnalyticsCard from '@containers/Card/AnalyticsCard';
import useQuery from '@hooks/useQuery';
import { GET_ACTIVE_MEMBERS_GROWTH } from '../Analytics.gql';

const ActiveMembersCard: React.FC = () => {
  const { data, loading } = useQuery({
    name: 'getActiveMembersGrowth',
    query: GET_ACTIVE_MEMBERS_GROWTH
  });

  if (loading) return null;

  return (
    <AnalyticsCard
      label="Active Users in Last 30 Days"
      percentage={data[1]}
      value={data[0]}
    />
  );
};

export default ActiveMembersCard;
