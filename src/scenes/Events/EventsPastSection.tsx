import day from 'dayjs';
import React from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import MainSection from '@containers/Main/MainSection';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import ListSearchBar from '@organisms/List/ListSearchBar';
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
      ?.filter((event: IEvent) => day().isAfter(day(event.endTime)))
      ?.filter(
        (event: IEvent) =>
          !event.attendees?.some((attendeeId: string) =>
            yourAttendees.has(attendeeId)
          )
      )
      ?.sort((a, b) => sortObjects(a, b, 'startTime'));
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

const EventsPastSection: React.FC<LoadingProps> = ({ loading }) => {
  const hasEvents: boolean = useStoreState(({ db }) => {
    const attendees = new Set(db.member.attendees);

    return !!db.community?.events
      ?.map((eventId: string) => db.byEventId[eventId])
      ?.filter((event: IEvent) => day().isAfter(day(event.endTime)))
      ?.filter(
        (event: IEvent) =>
          !event.attendees?.some((attendeeId: string) =>
            attendees.has(attendeeId)
          )
      );
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
