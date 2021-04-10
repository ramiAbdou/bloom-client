import React from 'react';

import Row from '@components/containers/Row/Row';
import { TableFilterFunction } from '@components/organisms/Table/TableFilterPanel/TableFilterPanel.types';
import TableQuickFilter from '@components/organisms/Table/TableQuickFilter';
import { IEvent } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { IndividualEventTableRowProps } from './IndividualEvent.types';

const IndividualEventViewedFilter: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { recordingUrl } = useFindOne(IEvent, {
    fields: ['recordingUrl'],
    where: { id: eventId }
  });

  const filter: TableFilterFunction = (
    row: IndividualEventTableRowProps
  ): boolean => !!row.watched;

  return (
    <TableQuickFilter
      filter={filter}
      show={!!recordingUrl}
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
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { endTime, startTime } = useFindOne(IEvent, {
    fields: ['endTime', 'startTime'],
    where: { id: eventId }
  });

  const isUpcoming: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.UPCOMING;

  const filter: TableFilterFunction = (
    row: IndividualEventTableRowProps
  ): boolean => !!row.joinedAt;

  return <TableQuickFilter filter={filter} show={!isUpcoming} title="Joined" />;
};

const IndividualEventNoShowFilter: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { endTime, startTime } = useFindOne(IEvent, {
    fields: ['endTime', 'startTime'],
    where: { id: eventId }
  });

  const isPast: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.PAST;

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
