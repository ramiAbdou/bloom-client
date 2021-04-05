import day from 'dayjs';
import deepmerge from 'deepmerge';
import { State } from 'easy-peasy';
import React from 'react';

import {
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IMember,
  ISupporter
} from '@db/db.entities';
import { DbModel } from '@db/db.types';
import { TableColumn, TableRow } from '@organisms/Table/Table.types';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { QuestionType } from '@util/constants';
import { sortObjects } from '@util/util';
import { IndividualEventTableRowProps } from './IndividualEvent.types';

/**
 * Returns a record of data for everybody who attended the event.
 *
 * @param db Entire DB store.
 */
const getIndividualEventTableAttendees = (
  db: State<DbModel>,
  gql: any
): Record<string, IndividualEventTableRowProps> => {
  if (!db.event.eventAttendees) return {};

  return db.event.eventAttendees.reduce(
    (acc: Record<string, IndividualEventTableRowProps>, attendeeId: string) => {
      const eventAttendee: IEventAttendee = db.byEventAttendeeId[attendeeId];

      const member: IMember = gql.supporters.fromCache({
        fields: ['email', 'firstName', 'lastName'],
        id: eventAttendee?.member
      });

      const supporter: ISupporter = gql.supporters.fromCache({
        fields: ['email', 'firstName', 'lastName'],
        id: eventAttendee?.supporter
      });

      const email: string = member?.email ?? supporter?.email;
      const firstName: string = member?.firstName ?? supporter?.firstName;
      const lastName: string = member?.lastName ?? supporter?.lastName;

      // If the email already exists in the record, don't go again.
      if (acc[email]) return acc;

      const data: IndividualEventTableRowProps = {
        email,
        fullName: `${firstName} ${lastName}`,
        id: eventAttendee?.member,
        joinedAt: eventAttendee.createdAt,
        watched: false
      };

      return { ...acc, [email]: data };
    },
    {}
  );
};

/**
 * Returns a record of data for everybody who RSVP'd to the event.
 *
 * @param db Entire DB store.
 * @param gql Entire GQL object.
 */
const getIndividualEventTableGuests = (
  db: State<DbModel>,
  gql: any
): Record<string, IndividualEventTableRowProps> => {
  if (!db.event.eventGuests) return {};

  return db.event.eventGuests.reduce(
    (acc: Record<string, IndividualEventTableRowProps>, guestId: string) => {
      const guest: IEventGuest = db.byEventGuestId[guestId];
      const member: IMember = db.byMemberId[guest?.member];

      const supporter = gql.supporters.fromCache({
        fields: ['email', 'firstName', 'lastName'],
        id: guest?.supporter
      });

      const email: string = member?.email ?? supporter?.email;
      const firstName: string = member?.firstName ?? supporter?.firstName;
      const lastName: string = member?.lastName ?? supporter?.lastName;

      if (acc[email]) return acc;

      const data: IndividualEventTableRowProps = {
        email,
        fullName: `${firstName} ${lastName}`,
        id: guest?.member,
        rsvpdAt: guest.createdAt,
        watched: false
      };

      return { ...acc, [email]: data };
    },
    {}
  );
};

/**
 * Returns a record of data for everybody who viewed the event recording.
 *
 * @param db Entire DB store.
 */
const getIndividualEventTableViewers = (
  db: State<DbModel>,
  gql: any
): Record<string, IndividualEventTableRowProps> => {
  if (!db.event.eventWatches) return {};

  return db.event.eventWatches.reduce(
    (acc: Record<string, IndividualEventTableRowProps>, watchId: string) => {
      const eventWatch: IEventWatch = gql.eventWatches.fromCache({
        id: watchId
      });

      const member: IMember = db.byMemberId[eventWatch?.member];

      const { email } = member ?? {};

      if (acc[email]) return acc;

      const data: IndividualEventTableRowProps = {
        email,
        fullName: `${member.firstName} ${member.lastName}`,
        id: member?.id,
        watched: true
      };

      return { ...acc, [email]: data };
    },
    {}
  );
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
export const getIndividualEventTableRows = (
  db: State<DbModel>,
  gql: any
): TableRow[] => {
  const attendeesRecord = getIndividualEventTableAttendees(db, gql);
  const guestsRecord = getIndividualEventTableGuests(db, gql);
  const viewersRecord = getIndividualEventTableViewers(db, gql);

  const totalRecord: Record<string, IndividualEventTableRowProps> = deepmerge(
    deepmerge(attendeesRecord, guestsRecord),
    viewersRecord
  );

  if (!totalRecord) return null;

  return Object.values(
    totalRecord
  )?.sort((a: IndividualEventTableRowProps, b: IndividualEventTableRowProps) =>
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
  const endTime: string = db.event?.endTime;
  const recordingUrl: string = db.event?.recordingUrl;
  const startTime: string = db.event?.startTime;

  const isUpcoming: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.UPCOMING;

  const joinedAtColumn: TableColumn[] = isUpcoming
    ? []
    : [
        {
          id: 'joinedAt',
          render: (value: string) =>
            value && <p>{day(value).format('MMM D @ h:mm A')}</p>,
          title: `Joined At`,
          type: QuestionType.SHORT_TEXT
        }
      ];

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
      render: (value: string) =>
        value && <p>{day(value).format('MMM D @ h:mm A')}</p>,
      title: `RSVP'd At`,
      type: QuestionType.SHORT_TEXT
    },
    ...viewedRecordingColumn
  ];

  return columns;
};
