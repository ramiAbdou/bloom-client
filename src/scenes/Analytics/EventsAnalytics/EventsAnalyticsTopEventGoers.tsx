import day from 'dayjs';
import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import LoadingHeader from '@components/containers/LoadingHeader/LoadingHeader';
import Section from '@components/containers/Section';
import Table from '@components/organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@components/organisms/Table/Table.types';
import TableContent from '@components/organisms/Table/TableContent';
import useFind from '@core/gql/hooks/useFind';
import { modalVar } from '@core/state/Modal.reactive';
import { ModalType, QuestionType } from '@util/constants';
import { IEvent, IEventAttendee } from '@util/constants.entities';
import { sortObjects } from '@util/util';

const EventsAnalyticsTopEventGoersTable: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);

  const { data: events, loading } = useFind(IEvent, {
    fields: [
      'eventAttendees.id',
      'eventAttendees.member.email',
      'eventAttendees.member.firstName',
      'eventAttendees.member.id',
      'eventAttendees.member.lastName',
      'eventAttendees.supporter.email',
      'eventAttendees.supporter.firstName',
      'eventAttendees.supporter.id',
      'eventAttendees.supporter.lastName',
      'startTime',
      'title'
    ],
    where: { communityId, endTime: { _lt: day.utc().format() } }
  });

  if (loading) return null;

  const allAttendees: IEventAttendee[] = events?.reduce(
    (result: IEventAttendee[], event: IEvent) =>
      event?.eventAttendees ? result.concat(event.eventAttendees) : result,
    []
  );

  const result = allAttendees?.reduce((acc, eventAttendee: IEventAttendee) => {
    const { member, supporter } = eventAttendee;

    const email: string = member?.email ?? supporter?.email;
    const firstName: string = member?.firstName ?? supporter?.firstName;
    const lastName: string = member?.lastName ?? supporter?.lastName;
    const previousValue = acc[email];

    return {
      ...acc,
      [email]: {
        email,
        fullName: `${firstName} ${lastName}`,
        id: email,
        memberId: member?.id ?? supporter?.id,
        value: previousValue ? previousValue?.value + 1 : 1
      }
    };
  }, {});

  const rows: TableRow[] = result
    ? (Object.values(result) as TableRow[])
        .sort((a: TableRow, b: TableRow) => sortObjects(a, b, 'value'))
        ?.slice(0, 10)
    : [];

  const columns: TableColumn[] = [
    { id: 'fullName', title: 'Full Name', type: QuestionType.SHORT_TEXT },
    { id: 'email', title: 'Email', type: QuestionType.LONG_TEXT },
    {
      id: 'value',
      title: '# of Events Attended',
      type: QuestionType.SHORT_TEXT
    }
  ];

  const options: TableOptions = {
    isSortable: false,
    onRowClick: ({ memberId }: TableRow) => {
      modalVar({ id: ModalType.PROFILE, metadata: memberId });
    },
    showCount: false
  };

  return (
    <Table columns={columns} options={options} rows={rows} totalCount={0}>
      <TableContent emptyMessage="Looks like nobody has attended an event yet." />
    </Table>
  );
};

const EventsAnalyticsTopEventGoers: React.FC = () => (
  <Section>
    <LoadingHeader h2 className="mb-sm" title="Top Event Goers" />
    <EventsAnalyticsTopEventGoersTable />
  </Section>
);

export default EventsAnalyticsTopEventGoers;
