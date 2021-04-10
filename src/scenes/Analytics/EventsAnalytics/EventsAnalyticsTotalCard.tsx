import day from 'dayjs';
import React from 'react';

import GrayCard from '@components/containers/Card/GrayCard';
import { IEvent } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFind from '@gql/hooks/useFind';

const EventsAnalyticsTotalCard: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const pastEvents: IEvent[] = useFind(IEvent, {
    where: { communityId, endTime: { _lt: day.utc().format() } }
  });

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
