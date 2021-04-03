import React from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import Section from '@containers/Section';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { IEvent, IEventAttendee } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { LoadingProps } from '@util/constants';
import EventsCard from '../EventsCard/EventsCard';

const PastEventsYourList: React.FC = () => {
  const events: IEvent[] = useStoreState(({ db }) =>
    db.member.eventAttendees
      ?.map((attendeeId: string) => db.byEventAttendeeId[attendeeId])
      ?.map(
        (eventAttendee: IEventAttendee) => db.byEventId[eventAttendee.event]
      )
      ?.filter((event: IEvent) => getEventTiming(event) === EventTiming.PAST)
  );

  return (
    <List
      className="s-events-card-ctr"
      items={events}
      options={{ keys: ['title', 'summary', 'description'] }}
      render={EventsCard}
    />
  );
};

const PastEventsYourSection: React.FC<LoadingProps> = ({ loading }) => {
  const hasEvents: boolean = useStoreState(
    ({ db }) =>
      !!db.member.eventAttendees
        ?.map((attendeeId: string) => db.byEventAttendeeId[attendeeId])
        ?.map(
          (eventAttendee: IEventAttendee) => db.byEventId[eventAttendee.event]
        )
        ?.filter((event: IEvent) => getEventTiming(event) === EventTiming.PAST)
        ?.length
  );

  return (
    <Section show={hasEvents}>
      <LoadingHeader
        h2
        className="mb-sm"
        loading={loading}
        title="Your Events Attended"
      />

      <ListStore.Provider>
        <PastEventsYourList />
      </ListStore.Provider>
    </Section>
  );
};

export default PastEventsYourSection;
