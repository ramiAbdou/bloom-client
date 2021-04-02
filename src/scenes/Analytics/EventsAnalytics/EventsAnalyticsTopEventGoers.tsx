import React from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import Section from '@containers/Section';
import Table from '@organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import {
  IEvent,
  IEventAttendee,
  IMember,
  ISupporter
} from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType, QuestionType } from '@util/constants';
import { sortObjects } from '@util/util';

const EventsAnalyticsTopEventGoersTable: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const rows: TableRow[] = useStoreState(({ db }) => {
    const pastEvents: IEvent[] = db.community.events
      ?.map((eventId: string) => db.byEventId[eventId])
      ?.filter((event: IEvent) => getEventTiming(event) === EventTiming.PAST);

    const pastAttendees: IEventAttendee[] = pastEvents
      ?.reduce(
        (acc: string[], event: IEvent) =>
          event?.eventAttendees ? acc.concat(event.eventAttendees) : acc,
        []
      )
      ?.map((attendeeId: string) => db.byEventAttendeeId[attendeeId]);

    const result = pastAttendees?.reduce((acc, eventAttendee: IEventAttendee) => {
      const member: IMember = db.byMemberId[eventAttendee?.member];
      const supporter: ISupporter = db.bySupporterId[eventAttendee?.supporter];

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

    if (!result) return [];

    return (Object.values(result) as TableRow[])
      .sort((a: TableRow, b: TableRow) => sortObjects(a, b, 'value'))
      ?.slice(0, 10);
  });

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
