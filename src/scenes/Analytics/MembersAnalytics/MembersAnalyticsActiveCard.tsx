import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import useQuery from '@hooks/useQuery';
import { QueryEvent } from '@util/events';

const MembersAnalyticsActiveCard: React.FC = () => {
  const { data, loading } = useQuery<[number, number]>({
    operation: QueryEvent.GET_ACTIVE_MEMBERS_GROWTH
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
