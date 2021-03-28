import day from 'dayjs';
import React from 'react';
import { useHistory } from 'react-router-dom';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import MainSection from '@containers/Main/MainSection';
import Table from '@organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import TableSearchBar from '@organisms/Table/TableSeachBar';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { QuestionType } from '@util/constants';
import { sortObjects } from '@util/util';

const EventsAnalyticsRecentEventsTable: React.FC = () => {
  const urlName = useStoreState(({ db }) => {
    return db.community?.urlName;
  });

  const rows: TableRow[] = useStoreState(({ db }) => {
    return db.community.events
      ?.map((eventId: string) => {
        return db.byEventId[eventId];
      })
      ?.filter((event: IEvent) => {
        return day().isAfter(event.endTime);
      })
      ?.map(({ attendees, id, guests, startTime, title, watches }: IEvent) => {
        return {
          date: day(startTime).format('MMMM D, YYYY'),
          id,
          numAttendees: attendees?.length ?? 0,
          numGuests: guests?.length ?? 0,
          numViewers: watches?.length ?? 0,
          startTime,
          title
        };
      })
      .sort((a, b) => {
        return sortObjects(a, b, 'startTime');
      });
  });

  const columns: TableColumn[] = [
    { id: 'title', title: 'Title', type: QuestionType.LONG_TEXT },
    { id: 'date', title: 'Date', type: QuestionType.SHORT_TEXT },
    {
      id: 'numAttendees',
      title: '# of Attendees',
      type: QuestionType.SHORT_TEXT
    },
    { id: 'numGuests', title: `# of RSVP's`, type: QuestionType.SHORT_TEXT },
    {
      id: 'numViewers',
      title: `# of Recording Viewers`,
      type: QuestionType.SHORT_TEXT
    }
  ];

  const { push } = useHistory();

  const options: TableOptions = {
    fixFirstColumn: false,
    isSortable: false,
    onRowClick: ({ id }: TableRow) => {
      return push(`/${urlName}/events/${id}`);
    },
    showCount: false
  };

  return (
    <Table columns={columns} options={options} rows={rows}>
      <TableSearchBar className="mb-sm--nlc" />
      <TableContent emptyMessage="Looks like nobody has attended an event yet." />
    </Table>
  );
};

const EventsAnalyticsTopEvents: React.FC = () => {
  return (
    <MainSection>
      <LoadingHeader h2 title="Recent Events" />
      <EventsAnalyticsRecentEventsTable />
    </MainSection>
  );
};

export default EventsAnalyticsTopEvents;
