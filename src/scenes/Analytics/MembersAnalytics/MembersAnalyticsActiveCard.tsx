import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import useBloomQuery from '@gql/useBloomQuery';
import { QueryEvent } from '@util/constants.events';

const MembersAnalyticsActiveCard: React.FC = () => {
  const { data, loading } = useBloomQuery<[number, number]>({
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
