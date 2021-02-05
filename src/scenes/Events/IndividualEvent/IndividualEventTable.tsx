import day from 'dayjs';
import React from 'react';

import { ModalType, QuestionType } from '@constants';
import MainSection from '@containers/Main/MainSection';
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
import { useStoreActions, useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import IndividualEventTableFilters from './IndividualEventTableFilters';

const IndividualEventTable: React.FC = () => {
  const isAdmin = useStoreState(({ db }) => !!db.member?.role);
  const recordingUrl = useStoreState(({ db }) => db.event?.recordingUrl);
  const startTime = useStoreState(({ db }) => db.event?.startTime);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

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
          id: attendee?.member,
          joinedAt: day(createdAt).format('MMM D @ h:mm A'),
          watched: 'No'
        }
      };
    }, {});

    const recordWithGuests =
      db.event.guests?.reduce((acc, guestId: string) => {
        const guest: IEventGuest = byGuestId[guestId];
        const { createdAt, firstName, lastName, email } = guest;
        const previousValue = acc[email];

        if (!previousValue) {
          return {
            ...acc,
            [email]: {
              email,
              fullName: `${firstName} ${lastName}`,
              id: guest?.member,
              rsvpdAt: day(createdAt).format('MMM D @ h:mm A'),
              watched: 'No'
            }
          };
        }

        return {
          ...acc,
          [email]: {
            ...previousValue,
            rsvpdAt: day(createdAt).format('MMM D @ h:mm A'),
            watched: 'No'
          }
        };
      }, record ?? {}) ?? record;

    const recordWithWatches =
      db.event.watches?.reduce((acc, watchId: string) => {
        const watch: IEventWatch = byWatchId[watchId];
        const member: IMember = byMemberId[watch?.member];
        const user: IUser = byUserId[member?.user];
        const { firstName, lastName, email } = user ?? {};
        const previousValue = acc[email];

        if (!previousValue) {
          return {
            ...acc,
            [email]: {
              email,
              fullName: `${firstName} ${lastName}`,
              id: watch?.member,
              watched: 'Yes'
            }
          };
        }

        return {
          ...acc,
          [email]: { ...previousValue, watched: 'Yes' }
        };
      }, recordWithGuests ?? {}) ?? recordWithGuests;

    if (!recordWithWatches) return null;

    return Object.values(recordWithWatches)?.sort((a, b) =>
      // @ts-ignore
      sortObjects(a, b, ['joinedAt', 'rsvpdAt'], 'DESC')
    ) as TableRow[];
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
          id: 'watched',
          title: `Viewed Recording`,
          type: 'TRUE_FALSE' as QuestionType
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
    onRowClick: (row: TableRow) => {
      showModal(`${ModalType.MEMBER_PROFILE}-${row?.id}`);
    },
    showCount: true
  };

  return (
    <MainSection className="s-events-individual-table-ctr" show={isAdmin}>
      <Table columns={columns} options={options} rows={rows}>
        <IndividualEventTableFilters />
        <TableContent small />
      </Table>
    </MainSection>
  );
};

export default IndividualEventTable;
