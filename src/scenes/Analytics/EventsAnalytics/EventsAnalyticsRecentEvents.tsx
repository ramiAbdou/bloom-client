import day from 'dayjs';
import React from 'react';
import { useHistory } from 'react-router-dom';

import LoadingHeader from '@components/containers/LoadingHeader/LoadingHeader';
import Section from '@components/containers/Section';
import Table from '@components/organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@components/organisms/Table/Table.types';
import TableContent from '@components/organisms/Table/TableContent';
import TableSearchBar from '@components/organisms/Table/TableSeachBar';
import { ICommunity, IEvent } from '@core/db/db.entities';
import useFind from '@core/gql/hooks/useFind';
import { useStoreState } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';
import { QuestionType } from '@util/constants';
import { sortObjects } from '@util/util';

const EventsAnalyticsRecentEventsTable: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { data: events, loading: loading1 } = useFind(IEvent, {
    fields: [
      'eventAttendees.id',
      'eventGuests.id',
      'eventWatches.id',
      'startTime',
      'title'
    ],
    where: { communityId, endTime: { _lt: day.utc().format() } }
  });

  const { data: community, loading: loading2 } = useFindOne(ICommunity, {
    fields: ['urlName'],
    where: { id: communityId }
  });

  const { push } = useHistory();

  if (loading1 || loading2) return null;

  const rows: TableRow[] = events
    .sort((a: IEvent, b: IEvent) => sortObjects(a, b, 'startTime'))
    .map((event: IEvent) => {
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
    onRowClick: ({ id }: TableRow) =>
      push(`/${community.urlName}/events/${id}`),
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
