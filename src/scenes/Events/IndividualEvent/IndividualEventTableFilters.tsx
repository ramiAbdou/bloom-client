import React from 'react';
import { eventIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Row from '@components/containers/Row/Row';
import { TableFilterFunction } from '@components/organisms/Table/TableFilterPanel/TableFilterPanel.types';
import TableQuickFilter from '@components/organisms/Table/TableQuickFilter';
import { IEvent } from '@util/db.entities';
import useFindOne from '@core/gql/hooks/useFindOne';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { IndividualEventTableRowProps } from './IndividualEvent.types';

const IndividualEventViewedFilter: React.FC = () => {
  const eventId: string = useReactiveVar(eventIdVar);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['recordingUrl'],
    where: { id: eventId }
  });

  if (loading) return null;

  const filter: TableFilterFunction = (
    row: IndividualEventTableRowProps
  ): boolean => !!row.watched;

  return (
    <TableQuickFilter
      filter={filter}
      show={!!event.recordingUrl}
      title="Viewed Recording"
    />
  );
};

const IndividualEventRsvpFilter: React.FC = () => {
  const filter: TableFilterFunction = (row: IndividualEventTableRowProps) =>
    !!row.rsvpdAt;

  return <TableQuickFilter filter={filter} title="RSVP'd" />;
};

const IndividualEventJoinedFilter: React.FC = () => {
  const eventId: string = useReactiveVar(eventIdVar);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['endTime', 'startTime'],
    where: { id: eventId }
  });

  if (loading) return null;

  const isUpcoming: boolean = getEventTiming(event) === EventTiming.UPCOMING;

  const filter: TableFilterFunction = (
    row: IndividualEventTableRowProps
  ): boolean => !!row.joinedAt;

  return <TableQuickFilter filter={filter} show={!isUpcoming} title="Joined" />;
};

const IndividualEventNoShowFilter: React.FC = () => {
  const eventId: string = useReactiveVar(eventIdVar);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['endTime', 'startTime'],
    where: { id: eventId }
  });

  if (loading) return null;

  const isPast: boolean = getEventTiming(event) === EventTiming.PAST;

  const filter: TableFilterFunction = (
    row: IndividualEventTableRowProps
  ): boolean => !!row.rsvpdAt && !row.joinedAt;

  return (
    <TableQuickFilter
      filter={filter}
      show={isPast}
      title="RSVP'd + Didn't Join"
    />
  );
};

const IndividualEventTableFilters: React.FC = () => (
  <Row wrap gap="sm">
    <IndividualEventJoinedFilter />
    <IndividualEventRsvpFilter />
    <IndividualEventViewedFilter />
    <IndividualEventNoShowFilter />
  </Row>
);

export default IndividualEventTableFilters;
