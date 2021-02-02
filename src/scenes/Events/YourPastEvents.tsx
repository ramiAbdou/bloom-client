import day from 'dayjs';
import React from 'react';

import { MainSection } from '@containers/Main';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import { IEvent, IEventAttendee } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import LoadingHeader from '../../components/containers/Loading/LoadingHeader';
import EventsCard from './EventsCard/EventsCard';

const YourPastEventsList: React.FC = () => {
  const events: IEvent[] = useStoreState(({ db }) => {
    const { byId: byAttendeeId } = db.entities.attendees;
    const { byId: byEventsId } = db.entities.events;

    return db.member.attendees
      ?.map((attendeeId: string) => byAttendeeId[attendeeId])
      ?.map((attendee: IEventAttendee) => byEventsId[attendee.event])
      ?.filter((event: IEvent) => day().isAfter(day(event?.endTime)));
  });

  return (
    <List
      Item={EventsCard}
      className="s-events-card-ctr"
      items={events}
      options={{ keys: ['title'] }}
    />
  );
};

const YourPastEventsContent: React.FC = () => (
  <ListStore.Provider>
    <MainSection className="s-events-section">
      <LoadingHeader h2 title="Your Events Attended" />
      <YourPastEventsList />
    </MainSection>
  </ListStore.Provider>
);

const YourPastEvents: React.FC = () => {
  const hasEvents: boolean = useStoreState(({ db }) => {
    const { byId: byAttendeeId } = db.entities.attendees;
    const { byId: byEventsId } = db.entities.events;

    return !!db.member.attendees
      ?.map((attendeeId: string) => byAttendeeId[attendeeId])
      ?.map((attendee: IEventAttendee) => byEventsId[attendee.event])
      ?.filter((event: IEvent) => day().isAfter(day(event?.endTime)))?.length;
  });

  return hasEvents ? <YourPastEventsContent /> : null;
};

export default YourPastEvents;
