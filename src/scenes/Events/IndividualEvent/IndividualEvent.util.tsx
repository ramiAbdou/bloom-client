import day from 'dayjs';
import deepmerge from 'deepmerge';
import { State } from 'easy-peasy';
import React from 'react';

import { TableColumn, TableRow } from '@organisms/Table/Table.types';
import { DbModel } from '@store/Db/Db.types';
import {
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IMember,
  ISupporter,
  IUser
} from '@store/Db/entities';
import { QuestionType } from '@util/constants';
import { sortObjects } from '@util/util';
import { IndividualEventTableRowProps } from './IndividualEvent.types';

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
    const member: IMember = db.byMemberId[attendee?.member];
    const supporter: ISupporter = db.bySupporterId[attendee?.supporter];

    const email = member?.email ?? supporter?.email;
    const firstName = member?.firstName ?? supporter?.firstName;
    const lastName = member?.lastName ?? supporter?.lastName;

    if (acc[email]) return acc;

    const data: IndividualEventTableRowProps = {
      email,
      fullName: `${firstName} ${lastName}`,
      id: attendee?.member,
      joinedAt: attendee.createdAt,
      userId: member?.user,
      watched: false
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
    const member: IMember = db.byMemberId[guest?.member];
    const supporter: ISupporter = db.bySupporterId[guest?.supporter];

    const email = member?.email ?? supporter?.email;
    const firstName = member?.firstName ?? supporter?.firstName;
    const lastName = member?.lastName ?? supporter?.lastName;

    if (acc[email]) return acc;

    const data: IndividualEventTableRowProps = {
      email,
      fullName: `${firstName} ${lastName}`,
      id: guest?.member,
      rsvpdAt: guest.createdAt,
      userId: member?.user,
      watched: false
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

    const { email } = user ?? {};
    if (acc[email]) return acc;

    const data: IndividualEventTableRowProps = {
      email,
      fullName: `${member.firstName} ${member.lastName}`,
      id: member?.id,
      userId: member?.user,
      watched: true
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
 * @param db Entire DB state.
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
    sortObjects(a, b, ['joinedAt', 'rsvpdAt'])
  ) as TableRow[];
};

/**
 * Returns an array of Table columns to render for the Individual event.
 * Depends upon the start time of the event whether or not to show joinedAt,
 * and viewedRecording columns.
 *
 * @param db Entire DB state.
 */
export const getIndividualEventTableColumns = (
  db: State<DbModel>
): TableColumn[] => {
  const recordingUrl = db.event?.recordingUrl;
  const startTime = db.event?.startTime;

  const joinedAtColumn: TableColumn[] = day().isAfter(day(startTime))
    ? [
        {
          id: 'joinedAt',
          render: (value) =>
            value && <p>{day(value).format('MMM D @ h:mm A')}</p>,
          title: `Joined At`,
          type: QuestionType.SHORT_TEXT
        }
      ]
    : [];

  const viewedRecordingColumn: TableColumn[] = recordingUrl
    ? [
        {
          format: (watched: boolean) => (watched ? 'Yes' : 'No'),
          id: 'watched',
          title: `Viewed Recording`,
          type: QuestionType.TRUE_FALSE
        }
      ]
    : [];

  const columns: TableColumn[] = [
    { id: 'fullName', title: 'Full Name', type: QuestionType.SHORT_TEXT },
    { id: 'email', title: 'Email', type: QuestionType.SHORT_TEXT },
    ...joinedAtColumn,
    {
      id: 'rsvpdAt',
      render: (value) => value && <p>{day(value).format('MMM D @ h:mm A')}</p>,
      title: `RSVP'd At`,
      type: QuestionType.SHORT_TEXT
    },
    ...viewedRecordingColumn
  ];

  return columns;
};
