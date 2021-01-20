import React from 'react';

import MainSection from '@containers/Main/MainSection';
import useQuery from '@hooks/useQuery';
import { ICommunity, IEvent } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreState } from '@store/Store';
import { GET_EVENTS } from './Events.gql';
import EventsCard from './EventsCard';

const UpcomingEvents: React.FC = () => {
  const events: IEvent[] = useStoreState(({ db }) => {
    const { byId: byEventsId } = db.entities.events;
    return db.community?.events?.map((eventId: string) => byEventsId[eventId]);
  });

  const { loading } = useQuery<ICommunity>({
    name: 'getEvents',
    query: GET_EVENTS,
    schema: Schema.COMMUNITY
  });

  return (
    <div>
      <MainSection loading={loading} title="Upcoming Events">
        <div className="s-events-card-ctr">
          {events?.map((event: IEvent) => (
            <EventsCard {...event} />
          ))}
        </div>
      </MainSection>
    </div>
  );
};

export default UpcomingEvents;
