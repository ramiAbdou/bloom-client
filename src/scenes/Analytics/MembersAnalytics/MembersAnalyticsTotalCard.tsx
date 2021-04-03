import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import useBloomQuery from '@hooks/useBloomQuery';
import { QueryEvent } from '@util/constants.events';

const MembersAnalyticsTotalCard: React.FC = () => {
  const { data, loading } = useBloomQuery<[number, number]>({
    operation: QueryEvent.GET_MEMBERS_GROWTH
  });

  return (
    <GrayCard
      label="Total Members"
      percentage={data && data[1]}
      show={!loading && !!data}
      value={data && data[0]}
    />
  );
};

export default MembersAnalyticsTotalCard;
