import day from 'dayjs';
import React from 'react';

import { MainSection } from '@containers/Main';
import Table from '@organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { IEvent, IEventAttendee } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const EventsAnalyticsFrequentAttendeesTable: React.FC = () => {
  const rows: TableRow[] = useStoreState(({ db }) => {
    const { byId: byAttendeeId } = db.entities.attendees;
    const { byId: byEventId } = db.entities.events;

    const result = db.community.events
      ?.map((eventId: string) => byEventId[eventId])
      ?.filter((event: IEvent) => day().isAfter(event.endTime))
      ?.reduce((acc: string[], event: IEvent) => {
        return acc.concat(event?.attendees);
      }, [])
      ?.map((attendeeId: string) => byAttendeeId[attendeeId])
      ?.reduce((acc, { email, firstName, lastName }: IEventAttendee) => {
        const previousValue = acc[email];

        if (!previousValue) {
          return {
            ...acc,
            [email]: {
              email,
              fullName: `${firstName} ${lastName}`,
              id: email,
              value: 1
            }
          };
        }
        return {
          ...acc,
          [email]: { ...previousValue, value: previousValue.value + 1 }
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
    { id: 'fullName', title: 'Full Name', type: 'SHORT_TEXT' },
    { id: 'email', title: 'Email', type: 'LONG_TEXT' },
    { id: 'value', title: '# of Events Attended', type: 'SHORT_TEXT' }
  ];

  const options: TableOptions = {
    alignEndRight: true,
    fixFirstColumn: false,
    isSortable: false,
    showCount: false
  };

  return (
    <Table columns={columns} options={options} rows={rows}>
      <TableContent emptyMessage="Looks like nobody has attended an event yet." />
    </Table>
  );
};

const EventsAnalyticsFrequentAttendees: React.FC = () => (
  <MainSection title="Top 10 Event Goers">
    <EventsAnalyticsFrequentAttendeesTable />
  </MainSection>
);

export default EventsAnalyticsFrequentAttendees;
