import day from 'dayjs';
import React from 'react';

import GrayCard from '@components/containers/Card/GrayCard';
import { IEvent } from '@core/db/db.entities';
import useFind from '@core/gql/hooks/useFind';
import { useStoreState } from '@core/store/Store';

const EventsAnalyticsTotalCard: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { data: pastEvents, loading } = useFind(IEvent, {
    where: { communityId, endTime: { _lt: day.utc().format() } }
  });

  if (loading) return null;
  const pastEventsCount: number = pastEvents?.length;

  return (
    <GrayCard
      label="Events Hosted"
      show={pastEventsCount !== null}
      value={pastEventsCount}
    />
  );
};

export default EventsAnalyticsTotalCard;
