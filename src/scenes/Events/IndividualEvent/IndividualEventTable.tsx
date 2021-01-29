import day from 'dayjs';
import React from 'react';

import Table from '@organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { IEventAttendee, IEventGuest } from '@store/Db/entities';
// import TableSearchBar from '@organisms/Table/TableSeachBar';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';

const IndividualEventTable: React.FC = () => {
  const rows: TableRow[] = useStoreState(({ db }) => {
    const { byId: byAttendeeId } = db.entities.attendees;
    const { byId: byGuestId } = db.entities.guests;

    const record = db.event.attendees.reduce((acc, attendeeId: string) => {
      const attendee: IEventAttendee = byAttendeeId[attendeeId];
      const { createdAt, firstName, lastName, email } = attendee;

      return {
        ...acc,
        [email]: {
          email,
          fullName: `${firstName} ${lastName}`,
          id: email,
          joinedAt: day(createdAt).format('MMM, D @ h:mm A')
        }
      };
    }, {});

    const recordWithGuests = db.event.guests.reduce((acc, guestId: string) => {
      const guest: IEventGuest = byGuestId[guestId];
      const { createdAt, firstName, lastName, email } = guest;

      const previousValue = acc[email];
      if (!previousValue) {
        return {
          ...acc,
          [email]: {
            email,
            fullName: `${firstName} ${lastName}`,
            rsvpdAt: day(createdAt).format('MMM, D @ h:mm A')
          }
        };
      }

      return {
        ...acc,
        [email]: {
          ...previousValue,
          rsvpdAt: day(createdAt).format('MMM, D @ h:mm A')
        }
      };
    }, record);

    return Object.values(recordWithGuests).sort((a, b) =>
      // @ts-ignore
      sortObjects(a, b, ['joinedAt', 'rsvpdAt'], 'DESC')
    ) as TableRow[];
  });

  const columns: TableColumn[] = [
    { id: 'fullName', title: 'Full Name', type: 'SHORT_TEXT' },
    { id: 'email', title: 'Email', type: 'SHORT_TEXT' },
    { id: 'joinedAt', title: `Joined At`, type: 'SHORT_TEXT' },
    { id: 'rsvpdAt', title: `RSVPd At`, type: 'SHORT_TEXT' }
    // { id: 'value', title: '# of Events Attended', type: 'SHORT_TEXT' }
  ];

  const options: TableOptions = { hideIfEmpty: true, showCount: true };

  return (
    <Table columns={columns} options={options} rows={rows}>
      {/* <TableSearchBar /> */}
      <TableContent small />
    </Table>
  );
};

export default IndividualEventTable;
