import day from 'dayjs';
import deepmerge from 'deepmerge';
import React from 'react';

import { useReactiveVar } from '@apollo/client';
import { TableColumn, TableRow } from '@components/organisms/Table/Table.types';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { QuestionType } from '@util/constants';
import {
  IEvent,
  IEventAttendee,
  IEventGuest,
  IEventWatch
} from '@util/constants.entities';
import { sortObjects } from '@util/util';
import { individualEventInteractionsTableSortVar } from './Events.reactive';
import { IndividualEventTableRowProps } from './IndividualEvent.types';

/**
 * Returns a record of data for everybody who attended the event.
 *
 * @param db Entire DB store.
 */
const buildIndividualEventTableAttendees = (
  event: IEvent
): Record<string, IndividualEventTableRowProps> => {
  if (!event.eventAttendees.length) return {};

  return event.eventAttendees.reduce(
    (
      acc: Record<string, IndividualEventTableRowProps>,
      { createdAt, member, supporter }: IEventAttendee
    ) => {
      const email: string = member?.email ?? supporter?.email;
      const firstName: string = member?.firstName ?? supporter?.firstName;
      const lastName: string = member?.lastName ?? supporter?.lastName;

      // If the email already exists in the record, don't go again.
      if (acc[email]) return acc;

      const data: IndividualEventTableRowProps = {
        email,
        fullName: `${firstName} ${lastName}`,
        id: member?.id ?? supporter?.id,
        joinedAt: createdAt,
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
const buildIndividualEventTableGuests = (
  event: IEvent
): Record<string, IndividualEventTableRowProps> => {
  if (!event.eventGuests.length) return {};

  return event.eventGuests.reduce(
    (
      acc: Record<string, IndividualEventTableRowProps>,
      { createdAt, member, supporter }: IEventGuest
    ) => {
      const email: string = member?.email ?? supporter?.email;
      const firstName: string = member?.firstName ?? supporter?.firstName;
      const lastName: string = member?.lastName ?? supporter?.lastName;

      if (acc[email]) return acc;

      const data: IndividualEventTableRowProps = {
        email,
        fullName: `${firstName} ${lastName}`,
        id: member?.id ?? supporter?.id,
        rsvpdAt: createdAt,
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
const buildIndividualEventTableWatchers = (
  event: IEvent
): Record<string, IndividualEventTableRowProps> => {
  if (!event.eventWatches.length) return {};

  return event.eventWatches.reduce(
    (
      acc: Record<string, IndividualEventTableRowProps>,
      { member }: IEventWatch
    ) => {
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
export const useIndividualEventTableRows = (event: IEvent): TableRow[] => {
  const { sortColumnId, sortDirection } =
    useReactiveVar(individualEventInteractionsTableSortVar) ?? {};

  const eventAttendeesRecord: Record<
    string,
    IndividualEventTableRowProps
  > = buildIndividualEventTableAttendees(event);

  const eventGuestsRecord: Record<
    string,
    IndividualEventTableRowProps
  > = buildIndividualEventTableGuests(event);

  const eventWatchersRecord: Record<
    string,
    IndividualEventTableRowProps
  > = buildIndividualEventTableWatchers(event);

  const totalRecord: Record<string, IndividualEventTableRowProps> = deepmerge(
    deepmerge(eventAttendeesRecord, eventGuestsRecord),
    eventWatchersRecord
  );

  if (!totalRecord) return null;

  return Object.values(
    totalRecord
  )?.sort((a: IndividualEventTableRowProps, b: IndividualEventTableRowProps) =>
    sortObjects(
      a,
      b,
      (sortColumnId as keyof IndividualEventTableRowProps) ?? 'rsvpdAt',
      sortDirection
    )
  ) as TableRow[];
};

/**
 * Returns an array of Table columns to render for the Individual event.
 * Depends upon the start time of the event whether or not to show joinedAt,
 * and viewedRecording columns.
 */
export const buildIndividualEventTableColumns = (
  event: IEvent
): TableColumn[] => {
  const isUpcoming: boolean = getEventTiming(event) === EventTiming.UPCOMING;

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

  const viewedRecordingColumn: TableColumn[] = event.recordingUrl
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
