import React from 'react';

import { gql } from '@apollo/client';
import Table from '@components/organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@components/organisms/Table/Table.types';
import TableContent from '@components/organisms/Table/TableContent';
import { modalVar } from '@core/state/Modal.reactive';
import {
  ComponentWithFragments,
  ModalType,
  QuestionType
} from '@util/constants';
import { IEvent, IEventAttendee } from '@util/constants.entities';
import { sortObjects } from '@util/util';

const EventsAnalyticsTopGoersTable: ComponentWithFragments<IEvent[]> = ({
  data: events
}) => {
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

    return {
      ...acc,
      [email]: {
        email,
        fullName: `${firstName} ${lastName}`,
        id: email,
        memberId: member?.id ?? supporter?.id,
        value: acc[email] ? acc[email]?.value + 1 : 1
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

EventsAnalyticsTopGoersTable.fragment = gql`
  fragment EventsAnalyticsTopGoersTableFragment on events {
    eventAttendees {
      id

      member {
        email
        firstName
        id
        lastName
      }

      supporter {
        email
        firstName
        id
        lastName
      }
    }
  }
`;

export default EventsAnalyticsTopGoersTable;
