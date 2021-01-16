import React from 'react';

import useQuery from '@hooks/useQuery';
import { GET_ACTIVE_MEMBERS_GROWTH } from '../Analytics.gql';
import AnalyticsSimple from '../AnalyticsStatusCard';

const ActiveMembersCard: React.FC = () => {
  const { data, loading } = useQuery({
    name: 'getActiveMembersGrowth',
    query: GET_ACTIVE_MEMBERS_GROWTH
  });

  if (loading) return null;

  return (
    <AnalyticsSimple
      label="Active Users in Last 30 Days"
      percentage={data[1]}
      value={data[0]}
    />
  );
};

export default ActiveMembersCard;
