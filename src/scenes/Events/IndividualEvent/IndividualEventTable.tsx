import day from 'dayjs';
import React, { useEffect } from 'react';

import { ModalType, QuestionType } from '@constants';
import MainSection from '@containers/Main/MainSection';
import Show from '@containers/Show';
import useManualQuery from '@hooks/useManualQuery';
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
  IEventGuest,
  IEventWatch,
  IMember,
  IUser
} from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import {
  GET_EVENT_ATTENDEES,
  GET_EVENT_WATCHES,
  GetEventArgs
} from '../Events.gql';
import IndividualEventTableFilters from './IndividualEventTableFilters';

const IndividualEventTableContent: React.FC = () => {
  const recordingUrl = useStoreState(({ db }) => db.event?.recordingUrl);
  const startTime = useStoreState(({ db }) => db.event?.startTime);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const rows: TableRow[] = useStoreState(({ db }) => {
    const record = db.event.attendees?.reduce((acc, attendeeId: string) => {
      const attendee: IEventAttendee = db.byAttendeeId[attendeeId];
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
        const guest: IEventGuest = db.byGuestId[guestId];
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
        const watch: IEventWatch = db.byWatchId[watchId];
        const member: IMember = db.byMemberId[watch?.member];
        const user: IUser = db.byUserId[member?.user];
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
    <MainSection className="s-events-individual-table-ctr">
      <Table columns={columns} options={options} rows={rows}>
        <IndividualEventTableFilters />
        <TableContent small />
      </Table>
    </MainSection>
  );
};

const IndividualEventTable: React.FC = () => {
  const eventId = useStoreState(({ db }) => db.event?.id);
  const isAdmin = useStoreState(({ db }) => !!db.member?.role);

  const [getEventAttendees, { loading: loading1 }] = useManualQuery<
    IEvent,
    GetEventArgs
  >({
    name: 'getEventAttendees',
    query: GET_EVENT_ATTENDEES,
    schema: [Schema.EVENT_ATTENDEE],
    variables: { eventId }
  });

  const [getEventWatches, { loading: loading2 }] = useManualQuery<
    IEvent,
    GetEventArgs
  >({
    name: 'getEventWatches',
    query: GET_EVENT_WATCHES,
    schema: [Schema.EVENT_WATCH],
    variables: { eventId }
  });

  const loading = loading1 || loading2;

  useEffect(() => {
    if (isAdmin) {
      getEventAttendees();
      getEventWatches();
    }
  }, []);

  return (
    <Show show={!!isAdmin && !loading}>
      <IndividualEventTableContent />
    </Show>
  );
};

export default IndividualEventTable;
