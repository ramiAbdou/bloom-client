import day from 'dayjs';
import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import { IEvent } from '@db/db.entities';
import useFind from '@gql/useFind';
import { useStoreState } from '@store/Store';

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
