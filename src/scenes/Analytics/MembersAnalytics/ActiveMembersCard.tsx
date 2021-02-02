import React from 'react';

import AnalyticsCard from '@containers/Card/AnalyticsCard';
import useQuery from '@hooks/useQuery';
import { GET_ACTIVE_MEMBERS_GROWTH } from '../Analytics.gql';

const ActiveMembersCard: React.FC = () => {
  const { data, loading } = useQuery({
    name: 'getActiveMembersGrowth',
    query: GET_ACTIVE_MEMBERS_GROWTH
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

export default ActiveMembersCard;
