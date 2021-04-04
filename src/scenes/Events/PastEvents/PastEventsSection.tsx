import React from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import Section from '@containers/Section';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import ListSearchBar from '@organisms/List/ListSearchBar';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { IEvent } from '@store/Db/Db.entities';
import { useStoreState } from '@store/Store';
import { LoadingProps } from '@util/constants';
import { sortObjects } from '@util/util';
import EventsCard from '../EventsCard/EventsCard';

const PastEventsList: React.FC = () => {
  const pastEvents: IEvent[] = useStoreState(({ db }) => {
    const yourAttendees: Set<string> = new Set(db.member.eventAttendees);

    return db.community?.events
      ?.map((eventId: string) => db.byEventId[eventId])
      ?.filter((event: IEvent) => getEventTiming(event) === EventTiming.PAST)
      ?.filter((event: IEvent) => {
        const wentToEvent: boolean = !event.eventAttendees?.some(
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

const PastEventsSection: React.FC<LoadingProps> = ({ loading }) => (
  <Section>
    <LoadingHeader h2 className="mb-sm" loading={loading} title="Past Events" />

    <ListStore.Provider>
      <PastEventsList />
    </ListStore.Provider>
  </Section>
);

export default PastEventsSection;
