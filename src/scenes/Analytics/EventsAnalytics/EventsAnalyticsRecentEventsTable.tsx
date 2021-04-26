import day from 'dayjs';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { gql } from '@apollo/client';
import Table from '@components/organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@components/organisms/Table/Table.types';
import TableContent from '@components/organisms/Table/TableContent';
import useCommunityUrlName from '@core/hooks/useCommunityUrlName';
import { ComponentWithFragments, QuestionType } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const EventsAnalyticsRecentEventsTable: ComponentWithFragments<IEvent[]> = ({
  data: events
}) => {
  const { push } = useHistory();
  const urlName: string = useCommunityUrlName();

  const rows: TableRow[] = events.map((event: IEvent) => {
    return {
      date: day(event.startTime).format('MMMM D, YYYY'),
      id: event.id,
      numAttendees: event.eventAttendees?.length ?? 0,
      numGuests: event.eventGuests?.length ?? 0,
      numViewers: event.eventWatches?.length ?? 0,
      startTime: event.startTime,
      title: event.title
    };
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

  const options: TableOptions = {
    isSortable: false,
    onRowClick: ({ id }: TableRow) => push(`/${urlName}/events/${id}`),
    showCount: false
  };

  return (
    <Table columns={columns} options={options} rows={rows} totalCount={0}>
      {/* <SearchBar className="mb-sm--nlc" /> */}
      <TableContent emptyMessage="Looks like nobody has attended an event yet." />
    </Table>
  );
};

EventsAnalyticsRecentEventsTable.fragment = gql`
  fragment EventsAnalyticsRecentEventsTableFragment on events {
    startTime
    title

    eventAttendees {
      id
    }

    eventGuests {
      id
    }

    eventWatches {
      id
    }
  }
`;

export default EventsAnalyticsRecentEventsTable;
