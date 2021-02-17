import day from 'dayjs';
import React from 'react';

import { LoadingProps } from '@constants';
import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import MainSection from '@containers/Main/MainSection';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import ListSearchBar from '@organisms/List/ListSearchBar';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import EventsCard from './EventsCard/EventsCard';

const EventsPastList: React.FC = () => {
  const events: IEvent[] = useStoreState(({ db }) => {
    const attendees = new Set(db.member.attendees);

    return db.community?.events
      ?.map((eventId: string) => db.byEventId[eventId])
      ?.filter((event: IEvent) => day().isAfter(day(event.endTime)))
      ?.filter((event: IEvent) => {
        return !event.attendees?.some((attendeeId: string) =>
          attendees.has(attendeeId)
        );
      })
      ?.sort((a, b) => sortObjects(a, b, 'startTime'));
  });

  return (
    <>
      <ListSearchBar
        className="mb-sm"
        placeholder="Search events..."
        show={!!events?.length}
      />

      <List
        Item={EventsCard}
        emptyMessage="Looks like there are no past events."
        items={events}
        options={{ keys: ['title'] }}
      />
    </>
  );
};

const EventsPastSection: React.FC<LoadingProps> = ({ loading }) => {
  const hasEvents: boolean = useStoreState(({ db }) => {
    const attendees = new Set(db.member.attendees);

    return !!db.community?.events
      ?.map((eventId: string) => db.byEventId[eventId])
      ?.filter((event: IEvent) => day().isAfter(day(event.endTime)))
      ?.filter((event: IEvent) => {
        return !event.attendees?.some((attendeeId: string) => {
          return attendees.has(attendeeId);
        });
      });
  });

  return (
    <MainSection show={hasEvents}>
      <LoadingHeader h2 loading={loading} title="Past Events" />

      <ListStore.Provider>
        <EventsPastList />
      </ListStore.Provider>
    </MainSection>
  );
};

export default EventsPastSection;
