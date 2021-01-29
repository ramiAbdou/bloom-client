import day from 'dayjs';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { MainSection } from '@containers/Main';
import Table from '@organisms/Table/Table';
import { Column, TableOptions, TableRow } from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import TableSearchBar from '@organisms/Table/TableSeachBar';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';

const EventsAnalyticsRecentEventsTable: React.FC = () => {
  const urlName = useStoreState(({ db }) => db.community?.urlName);

  const rows: TableRow[] = useStoreState(({ db }) => {
    const { byId: byEventId } = db.entities.events;

    return db.community.events
      ?.map((eventId: string) => byEventId[eventId])
      ?.filter((event: IEvent) => day().isAfter(event.endTime))
      ?.map(({ attendees, id, guests, startTime, title }: IEvent) => {
        return {
          date: day(startTime).format('MMMM D, YYYY'),
          id,
          numAttendees: attendees?.length ?? 0,
          numGuests: guests?.length ?? 0,
          title
        };
      })
      .sort((a, b) => sortObjects(a, b, 'numAttendees', 'DESC'));
  });

  const columns: Column[] = [
    { id: 'title', title: 'Title', type: 'LONG_TEXT' },
    { id: 'date', title: 'Date', type: 'SHORT_TEXT' },
    { id: 'numAttendees', title: '# of Attendees', type: 'SHORT_TEXT' },
    { id: 'numGuests', title: `# of RSVP's`, type: 'SHORT_TEXT' }
  ];

  const { push } = useHistory();

  const options: TableOptions = {
    fixFirstColumn: false,
    isSortable: false,
    onRowClick: (eventId: string) => push(`/${urlName}/events/${eventId}`),
    showCount: false
  };

  return (
    <Table columns={columns} options={options} rows={rows}>
      <TableSearchBar />
      <TableContent emptyMessage="Looks like nobody has attended an event yet." />
    </Table>
  );
};

const EventsAnalyticsTopEvents: React.FC = () => {
  return (
    <MainSection title="Recent Events">
      <EventsAnalyticsRecentEventsTable />
    </MainSection>
  );
};

export default EventsAnalyticsTopEvents;