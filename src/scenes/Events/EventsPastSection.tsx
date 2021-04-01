import React from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import Section from '@containers/Section';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import ListSearchBar from '@organisms/List/ListSearchBar';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { LoadingProps } from '@util/constants';
import { sortObjects } from '@util/util';
import EventsCard from './EventsCard/EventsCard';

const EventsPastList: React.FC = () => {
  const pastEvents: IEvent[] = useStoreState(({ db }) => {
    const yourAttendees: Set<string> = new Set(db.member.attendees);

    return db.community?.events
      ?.map((eventId: string) => db.byEventId[eventId])
      ?.filter((event: IEvent) => getEventTiming(event) === EventTiming.PAST)
      ?.filter((event: IEvent) => {
        const wentToEvent: boolean = !event.attendees?.some(
          (attendeeId: string) => yourAttendees.has(attendeeId)
        );

        return wentToEvent;
      })
      ?.sort((a: IEvent, b: IEvent) => sortObjects(a, b, 'startTime'));
  });

  return (
    <>
      <ListSearchBar
        className="mb-sm--nlc"
        placeholder="Search events..."
        show={!!pastEvents?.length}
      />

      <List
        emptyMessage="Looks like there were no past events found."
        items={pastEvents}
        options={{ keys: ['title', 'summary', 'description'] }}
        render={EventsCard}
      />
    </>
  );
};

const EventsPastSection: React.FC<LoadingProps> = ({ loading }) => (
  <Section>
    <LoadingHeader h2 className="mb-sm" loading={loading} title="Past Events" />

    <ListStore.Provider>
      <EventsPastList />
    </ListStore.Provider>
  </Section>
);

export default EventsPastSection;
