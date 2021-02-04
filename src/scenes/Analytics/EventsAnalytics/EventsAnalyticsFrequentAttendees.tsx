import day from 'dayjs';
import React from 'react';

import { ModalType } from '@constants';
import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import MainSection from '@containers/Main/MainSection';
import MemberProfileModal from '@modals/MemberProfile/MemberProfile';
import Table from '@organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { IEvent, IEventAttendee, IMember } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';

const EventsAnalyticsFrequentAttendeesTable: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const rows: TableRow[] = useStoreState(({ db }) => {
    const { byId: byAttendeeId } = db.entities.attendees;
    const { byId: byEventId } = db.entities.events;
    const { byId: byMemberId } = db.entities.members;

    const pastEvents: IEvent[] = db.community.events
      ?.map((eventId: string) => byEventId[eventId])
      ?.filter((event: IEvent) => day().isAfter(event.endTime));

    const pastAttendees: IEventAttendee[] = pastEvents
      ?.reduce((acc: string[], event: IEvent) => {
        return acc.concat(event?.attendees);
      }, [])
      ?.map((attendeeId: string) => byAttendeeId[attendeeId]);

    const result = pastAttendees?.reduce(
      (
        acc,
        { email, firstName, lastName, member: memberId }: IEventAttendee
      ) => {
        const member: IMember = byMemberId[memberId];
        const previousValue = acc[email];

        return {
          ...acc,
          [email]: {
            email,
            fullName: `${firstName} ${lastName}`,
            id: email,
            memberId,
            userId: member?.user,
            value: previousValue ? previousValue?.value + 1 : 1
          }
        };
      },
      {}
    );

    if (!result) return [];

    return (
      (Object.values(result) as TableRow[])
        // @ts-ignore
        .sort((a, b) => (a.value > b.value ? 1 : -1))
        ?.slice(0, 10)
    );
  });

  const columns: TableColumn[] = [
    { id: 'fullName', title: 'Full Name', type: 'SHORT_TEXT' },
    { id: 'email', title: 'Email', type: 'LONG_TEXT' },
    { id: 'value', title: '# of Events Attended', type: 'SHORT_TEXT' }
  ];

  const options: TableOptions = {
    alignEndRight: true,
    fixFirstColumn: false,
    isSortable: false,
    onRowClick: ({ memberId }: TableRow) => {
      showModal(`${ModalType.MEMBER_PROFILE}-${memberId}`);
    },
    showCount: false
  };

  return (
    <Table columns={columns} options={options} rows={rows}>
      <TableContent emptyMessage="Looks like nobody has attended an event yet." />

      {rows?.map(({ id, memberId }: TableRow) => {
        return <MemberProfileModal key={id} memberId={memberId} />;
      })}
    </Table>
  );
};

const EventsAnalyticsFrequentAttendees: React.FC = () => (
  <MainSection>
    <LoadingHeader h2 title="Top 10 Event Goers" />
    <EventsAnalyticsFrequentAttendeesTable />
  </MainSection>
);

export default EventsAnalyticsFrequentAttendees;
