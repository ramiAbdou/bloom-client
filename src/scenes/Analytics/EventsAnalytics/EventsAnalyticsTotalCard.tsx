import day from 'dayjs';
import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import GrayCard from '@components/containers/Card/GrayCard';
import { IEvent } from '@util/db.entities';
import useFind from '@core/gql/hooks/useFind';

const EventsAnalyticsTotalCard: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);

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
