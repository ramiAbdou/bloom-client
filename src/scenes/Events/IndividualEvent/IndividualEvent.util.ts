import day from 'dayjs';
import deepmerge from 'deepmerge';
import { State } from 'easy-peasy';

import { IdProps } from '@constants';
import { TableRow } from '@organisms/Table/Table.types';
import { DbModel } from '@store/Db/Db.types';
import {
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IMember,
  IUser
} from '@store/Db/entities';
import { sortObjects } from '@util/util';

interface IndividualEventTableRowProps extends IdProps {
  fullName: string;
  email: string;
  joinedAt?: string;
  rsvpdAt?: string;
  watched?: string;
}

/**
 * Returns a record of data for everybody who attended the event.
 *
 * @param db Entire DB store.
 */
const getIndividualEventTableAttendees = (
  db: State<DbModel>
): Record<string, IndividualEventTableRowProps> => {
  if (!db.event.attendees) return {};

  return db.event.attendees.reduce((acc, attendeeId: string) => {
    const attendee: IEventAttendee = db.byAttendeeId[attendeeId];
    const { createdAt, firstName, lastName, email } = attendee;

    if (acc[email]) return acc;

    const data: IndividualEventTableRowProps = {
      email,
      fullName: `${firstName} ${lastName}`,
      id: attendee?.member,
      joinedAt: day(createdAt).format('MMM D @ h:mm A'),
      watched: 'No'
    };

    return { ...acc, [email]: data };
  }, {});
};

/**
 * Returns a record of data for everybody who RSVP'd to the event.
 *
 * @param db Entire DB store.
 */
const getIndividualEventTableGuests = (
  db: State<DbModel>
): Record<string, IndividualEventTableRowProps> => {
  if (!db.event.guests) return {};

  return db.event.guests.reduce((acc, guestId: string) => {
    const guest: IEventGuest = db.byGuestId[guestId];
    const { createdAt, firstName, lastName, email } = guest;

    if (acc[email]) return acc;

    const data: IndividualEventTableRowProps = {
      email,
      fullName: `${firstName} ${lastName}`,
      id: guest?.member,
      rsvpdAt: day(createdAt).format('MMM D @ h:mm A'),
      watched: 'No'
    };

    return { ...acc, [email]: data };
  }, {});
};

/**
 * Returns a record of data for everybody who viewed the event recording.
 *
 * @param db Entire DB store.
 */
const getIndividualEventTableViewers = (
  db: State<DbModel>
): Record<string, IndividualEventTableRowProps> => {
  if (!db.event.watches) return {};

  return db.event.watches.reduce((acc, watchId: string) => {
    const watch: IEventWatch = db.byWatchId[watchId];
    const member: IMember = db.byMemberId[watch?.member];
    const user: IUser = db.byUserId[member?.user];

    const { firstName, lastName, email } = user ?? {};
    if (acc[email]) return acc;

    const data: IndividualEventTableRowProps = {
      email,
      fullName: `${firstName} ${lastName}`,
      id: member?.id,
      watched: 'Yes'
    };

    return { ...acc, [email]: data };
  }, {});
};

/**
 * Returns the Table rows that correspond with all of the members who've
 * interacted with the event in the following capacities:
 *  - RSVP'd to the event.
 *  - Joined the event.
 *  - Viewed the event recording.
 *
 * @param db Entire DB store.
 */
export const getIndividualEventTableRows = (db: State<DbModel>): TableRow[] => {
  const attendeesRecord = getIndividualEventTableAttendees(db);
  const guestsRecord = getIndividualEventTableGuests(db);
  const viewersRecord = getIndividualEventTableViewers(db);

  const totalRecord: Record<string, IndividualEventTableRowProps> = deepmerge(
    deepmerge(attendeesRecord, guestsRecord),
    viewersRecord
  );

  if (!totalRecord) return null;

  return Object.values(totalRecord)?.sort((a, b) =>
    // @ts-ignore
    sortObjects(a, b, ['joinedAt', 'rsvpdAt'], 'DESC')
  ) as TableRow[];
};
