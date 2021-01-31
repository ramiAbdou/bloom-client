import day from 'dayjs';
import React from 'react';

import { QuestionType } from '@constants';
import Table from '@organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import {
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IMember,
  IUser
} from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';

const IndividualEventTable: React.FC = () => {
  const recordingUrl = useStoreState(({ db }) => db.event?.recordingUrl);
  const startTime = useStoreState(({ db }) => db.event?.startTime);

  const rows: TableRow[] = useStoreState(({ db }) => {
    const { byId: byAttendeeId } = db.entities.attendees;
    const { byId: byGuestId } = db.entities.guests;
    const { byId: byMemberId } = db.entities.members;
    const { byId: byUserId } = db.entities.users;
    const { byId: byWatchId } = db.entities.watches;

    const record = db.event.attendees?.reduce((acc, attendeeId: string) => {
      const attendee: IEventAttendee = byAttendeeId[attendeeId];
      const { createdAt, firstName, lastName, email } = attendee;

      return {
        ...acc,
        [email]: {
          email,
          fullName: `${firstName} ${lastName}`,
          id: email,
          joinedAt: day(createdAt).format('MMM D @ h:mm A'),
          numWatches: 0
        }
      };
    }, {});

    const recordWithGuests = db.event.guests?.reduce((acc, guestId: string) => {
      const guest: IEventGuest = byGuestId[guestId];
      const { createdAt, firstName, lastName, email } = guest;

      const previousValue = acc[email];
      if (!previousValue) {
        return {
          ...acc,
          [email]: {
            email,
            fullName: `${firstName} ${lastName}`,
            rsvpdAt: day(createdAt).format('MMM D @ h:mm A')
          }
        };
      }

      return {
        ...acc,
        [email]: {
          ...previousValue,
          rsvpdAt: day(createdAt).format('MMM D @ h:mm A')
        }
      };
    }, record);

    const recordWithWatches = db.event.watches?.reduce(
      (acc, watchId: string) => {
        const watch: IEventWatch = byWatchId[watchId];
        const member: IMember = byMemberId[watch.member];
        const user: IUser = byUserId[member.user];

        const { firstName, lastName, email } = user;

        const previousValue = acc[email];

        if (!previousValue) {
          return {
            ...acc,
            [email]: {
              email,
              fullName: `${firstName} ${lastName}`,
              numWatches: 1
            }
          };
        }

        return {
          ...acc,
          [email]: {
            ...previousValue,
            numWatches: previousValue.numWatches + 1
          }
        };
      },
      recordWithGuests
    );

    return (
      Object.values(recordWithWatches)
        // @ts-ignore
        ?.map((e) => ({ ...e, numWatches: e.numWatches?.toString() }))
        ?.sort((a, b) =>
          // @ts-ignore
          sortObjects(a, b, ['joinedAt', 'rsvpdAt', 'numWatches'], 'DESC')
        ) as TableRow[]
    );
  });

  const joinedAtColumn = day().isAfter(day(startTime))
    ? [
        {
          id: 'joinedAt',
          title: `Joined At`,
          type: 'SHORT_TEXT' as QuestionType
        }
      ]
    : [];

  const recordingClicksColumn = recordingUrl
    ? [
        {
          id: 'numWatches',
          title: `# of Recording Views`,
          type: 'SHORT_TEXT' as QuestionType
        }
      ]
    : [];

  const columns: TableColumn[] = [
    {
      category: 'PICTURE_FULL_NAME',
      id: 'fullName',
      title: 'Full Name',
      type: 'SHORT_TEXT'
    },
    { id: 'email', title: 'Email', type: 'SHORT_TEXT' },
    ...joinedAtColumn,
    { id: 'rsvpdAt', title: `RSVP'd At`, type: 'SHORT_TEXT' },
    ...recordingClicksColumn
  ];

  const options: TableOptions = {
    fixFirstColumn: false,
    hideIfEmpty: true,
    showCount: true
  };

  return (
    <Table columns={columns} options={options} rows={rows}>
      <TableContent small />
    </Table>
  );
};

export default IndividualEventTable;
