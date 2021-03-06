import day from 'dayjs';
import React from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import MainSection from '@containers/Main/MainSection';
import Table from '@organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import {
  IEvent,
  IEventAttendee,
  IMember,
  ISupporter
} from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType, QuestionType } from '@util/constants';

const EventsAnalyticsFrequentAttendeesTable: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const rows: TableRow[] = useStoreState(({ db }) => {
    const pastEvents: IEvent[] = db.community.events
      ?.map((eventId: string) => db.byEventId[eventId])
      ?.filter((event: IEvent) => day().isAfter(event.endTime));

    const pastAttendees: IEventAttendee[] = pastEvents
      ?.reduce((acc: string[], event: IEvent) => {
        return event?.attendees ? acc.concat(event.attendees) : acc;
      }, [])
      ?.map((attendeeId: string) => db.byAttendeeId[attendeeId]);

    const result = pastAttendees?.reduce((acc, attendee: IEventAttendee) => {
      const member: IMember = db.byMemberId[attendee?.member];
      const supporter: ISupporter = db.bySupporterId[attendee?.supporter];

      const email = member?.email ?? supporter?.email;
      const firstName = member?.firstName ?? supporter?.firstName;
      const lastName = member?.lastName ?? supporter?.lastName;

      const previousValue = acc[email];

      return {
        ...acc,
        [email]: {
          email,
          fullName: `${firstName} ${lastName}`,
          id: email,
          memberId: member.id ?? supporter.id,
          value: previousValue ? previousValue?.value + 1 : 1
        }
      };
    }, {});

    if (!result) return [];

    return (
      (Object.values(result) as TableRow[])
        // @ts-ignore
        .sort((a, b) => (a.value > b.value ? 1 : -1))
        ?.slice(0, 10)
    );
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
    fixFirstColumn: false,
    isSortable: false,
    onRowClick: ({ memberId }: TableRow) => {
      showModal({ id: ModalType.PROFILE, metadata: memberId });
    },
    showCount: false
  };

  return (
    <Table columns={columns} options={options} rows={rows}>
      <TableContent emptyMessage="Looks like nobody has attended an event yet." />
    </Table>
  );
};

const EventsAnalyticsFrequentAttendees: React.FC = () => (
  <MainSection>
    <LoadingHeader h2 title="Top Event Goers" />
    <EventsAnalyticsFrequentAttendeesTable />
  </MainSection>
);

export default EventsAnalyticsFrequentAttendees;
