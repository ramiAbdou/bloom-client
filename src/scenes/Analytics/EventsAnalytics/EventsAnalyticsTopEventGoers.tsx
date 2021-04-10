import day from 'dayjs';
import React from 'react';

import LoadingHeader from '@components/containers/LoadingHeader/LoadingHeader';
import Section from '@components/containers/Section';
import { IEvent, IEventAttendee } from '@core/db/db.entities';
import useFind from '@gql/hooks/useFind';
import Table from '@components/organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@components/organisms/Table/Table.types';
import TableContent from '@components/organisms/Table/TableContent';
import { useStoreActions, useStoreState } from '@core/store/Store';
import { ModalType, QuestionType } from '@util/constants';
import { sortObjects } from '@util/util';

const EventsAnalyticsTopEventGoersTable: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const events: IEvent[] = useFind(IEvent, {
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
      showModal({ id: ModalType.PROFILE, metadata: memberId });
    },
    showCount: false
  };

  return (
    <Table columns={columns} options={options}>
      <TableContent
        emptyMessage="Looks like nobody has attended an event yet."
        rows={rows}
      />
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
