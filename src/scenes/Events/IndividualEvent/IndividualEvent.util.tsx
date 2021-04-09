import day from 'dayjs';
import deepmerge from 'deepmerge';
import React from 'react';

import {
  IEvent,
  IEventAttendee,
  IEventGuest,
  IEventWatch
} from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import { TableColumn, TableRow } from '@organisms/Table/Table.types';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { useStoreState } from '@store/Store';
import { QuestionType } from '@util/constants';
import { sortObjects } from '@util/util';
import { IndividualEventTableRowProps } from './IndividualEvent.types';

/**
 * Returns a record of data for everybody who attended the event.
 *
 * @param db Entire DB store.
 */
const useIndividualEventTableAttendees = (): Record<
  string,
  IndividualEventTableRowProps
> => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { eventAttendees } = useFindOne(IEvent, {
    fields: [
      'eventAttendees.createdAt',
      'eventAttendees.id',
      'eventAttendees.member.email',
      'eventAttendees.member.firstName',
      'eventAttendees.member.id',
      'eventAttendees.member.lastName',
      'eventAttendees.supporter.email',
      'eventAttendees.supporter.firstName',
      'eventAttendees.supporter.id',
      'eventAttendees.supporter.lastName'
    ],
    where: { id: eventId }
  });

  if (!eventAttendees) return {};

  return eventAttendees.reduce(
    (
      acc: Record<string, IndividualEventTableRowProps>,
      eventAttendee: IEventAttendee
    ) => {
      const { member, supporter } = eventAttendee;

      const email: string = member?.email ?? supporter?.email;
      const firstName: string = member?.firstName ?? supporter?.firstName;
      const lastName: string = member?.lastName ?? supporter?.lastName;

      // If the email already exists in the record, don't go again.
      if (acc[email]) return acc;

      const data: IndividualEventTableRowProps = {
        email,
        fullName: `${firstName} ${lastName}`,
        id: member?.id ?? supporter?.id,
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
 */
const useIndividualEventTableGuests = (): Record<
  string,
  IndividualEventTableRowProps
> => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { eventGuests } = useFindOne(IEvent, {
    fields: [
      'eventGuests.createdAt',
      'eventGuests.id',
      'eventGuests.member.email',
      'eventGuests.member.firstName',
      'eventGuests.member.id',
      'eventGuests.member.lastName',
      'eventGuests.supporter.email',
      'eventGuests.supporter.firstName',
      'eventGuests.supporter.id',
      'eventGuests.supporter.lastName'
    ],
    where: { id: eventId }
  });

  if (!eventGuests) return {};

  return eventGuests.reduce(
    (
      acc: Record<string, IndividualEventTableRowProps>,
      eventGuest: IEventGuest
    ) => {
      const { member, supporter } = eventGuest;

      const email: string = member?.email ?? supporter?.email;
      const firstName: string = member?.firstName ?? supporter?.firstName;
      const lastName: string = member?.lastName ?? supporter?.lastName;

      if (acc[email]) return acc;

      const data: IndividualEventTableRowProps = {
        email,
        fullName: `${firstName} ${lastName}`,
        id: member?.id ?? supporter?.id,
        rsvpdAt: eventGuest.createdAt,
        watched: false
      };

      return { ...acc, [email]: data };
    },
    {}
  );
};

/**
 * Returns a record of data for everybody who viewed the event recording.
 */
const useIndividualEventTableWatchers = (): Record<
  string,
  IndividualEventTableRowProps
> => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { eventWatches } = useFindOne(IEvent, {
    fields: [
      'eventWatches.createdAt',
      'eventWatches.id',
      'eventWatches.member.email',
      'eventWatches.member.firstName',
      'eventWatches.member.id',
      'eventWatches.member.lastName'
    ],
    where: { id: eventId }
  });

  if (!eventWatches) return {};

  return eventWatches.reduce(
    (
      acc: Record<string, IndividualEventTableRowProps>,
      eventWatch: IEventWatch
    ) => {
      const { member } = eventWatch;

      const email: string = member?.email;
      const firstName: string = member?.firstName;
      const lastName: string = member?.lastName;

      if (acc[email]) return acc;

      const data: IndividualEventTableRowProps = {
        email,
        fullName: `${firstName} ${lastName}`,
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
 */
export const useIndividualEventTableRows = (): TableRow[] => {
  const eventAttendeesRecord: Record<
    string,
    IndividualEventTableRowProps
  > = useIndividualEventTableAttendees();

  const eventGuestsRecord: Record<
    string,
    IndividualEventTableRowProps
  > = useIndividualEventTableGuests();

  const eventWatchersRecord: Record<
    string,
    IndividualEventTableRowProps
  > = useIndividualEventTableWatchers();

  const totalRecord: Record<string, IndividualEventTableRowProps> = deepmerge(
    deepmerge(eventAttendeesRecord, eventGuestsRecord),
    eventWatchersRecord
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
 */
export const useIndividualEventTableColumns = (): TableColumn[] => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { endTime, recordingUrl, startTime } = useFindOne(IEvent, {
    fields: ['endTime', 'recordingUrl', 'startTime'],
    where: { id: eventId }
  });

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
