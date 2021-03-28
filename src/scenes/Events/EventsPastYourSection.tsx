import day from 'dayjs';
import React from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import MainSection from '@containers/Main/MainSection';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import { IEvent, IEventAttendee } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { LoadingProps } from '@util/constants';
import EventsCard from './EventsCard/EventsCard';

const EventsPastYourList: React.FC = () => {
  const events: IEvent[] = useStoreState(({ db }) => {
    return db.member.attendees
      ?.map((attendeeId: string) => {
        return db.byAttendeeId[attendeeId];
      })
      ?.map((attendee: IEventAttendee) => {
        return db.byEventId[attendee.event];
      })
      ?.filter((event: IEvent) => {
        return day().isAfter(day(event?.endTime));
      });
  });

  return (
    <List
      className="s-events-card-ctr"
      items={events}
      options={{ keys: ['title', 'summary', 'description'] }}
      render={EventsCard}
    />
  );
};

const EventsPastYourSection: React.FC<LoadingProps> = ({ loading }) => {
  const hasEvents: boolean = useStoreState(({ db }) => {
    return !!db.member.attendees
      ?.map((attendeeId: string) => {
        return db.byAttendeeId[attendeeId];
      })
      ?.map((attendee: IEventAttendee) => {
        return db.byEventId[attendee.event];
      })
      ?.filter((event: IEvent) => {
        return day().isAfter(day(event?.endTime));
      })?.length;
  });

  return (
    <MainSection show={hasEvents}>
      <LoadingHeader h2 loading={loading} title="Your Events Attended" />

      <ListStore.Provider>
        <EventsPastYourList />
      </ListStore.Provider>
    </MainSection>
  );
};

export default EventsPastYourSection;
