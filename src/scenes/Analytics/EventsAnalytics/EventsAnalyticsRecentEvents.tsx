import day from 'dayjs';
import React from 'react';
import { useHistory } from 'react-router-dom';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import Section from '@containers/Section';
import Table from '@organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import TableSearchBar from '@organisms/Table/TableSeachBar';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { QuestionType } from '@util/constants';
import { sortObjects } from '@util/util';

const EventsAnalyticsRecentEventsTable: React.FC = () => {
  const urlName = useStoreState(({ db }) => db.community?.urlName);

  const rows: TableRow[] = useStoreState(({ db }) =>
    db.community.events
      ?.map((eventId: string) => db.byEventId[eventId])
      ?.filter((event: IEvent) => getEventTiming(event) === EventTiming.PAST)
      ?.map((event: IEvent) => {
        return {
          date: day(event.startTime).format('MMMM D, YYYY'),
          id: event.id,
          numAttendees: event.eventAttendees?.length ?? 0,
          numGuests: event.eventGuests?.length ?? 0,
          numViewers: event.eventWatches?.length ?? 0,
          startTime: event.startTime,
          title: event.title
        };
      })
      .sort((a, b) => sortObjects(a, b, 'startTime'))
  );

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
    isSortable: false,
    onRowClick: ({ id }: TableRow) => push(`/${urlName}/events/${id}`),
    showCount: false
  };

  return (
    <Table columns={columns} options={options}>
      <TableSearchBar className="mb-sm--nlc" />
      <TableContent
        emptyMessage="Looks like nobody has attended an event yet."
        rows={rows}
      />
    </Table>
  );
};

const EventsAnalyticsTopEvents: React.FC = () => (
  <Section>
    <LoadingHeader h2 className="mb-sm" title="Recent Events" />
    <EventsAnalyticsRecentEventsTable />
  </Section>
);

export default EventsAnalyticsTopEvents;
