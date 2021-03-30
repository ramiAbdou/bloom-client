import React from 'react';

import Row from '@containers/Row/Row';
import { TableFilterFunction } from '@organisms/Table/TableFilterPanel/TableFilterPanel.types';
import TableQuickFilter from '@organisms/Table/TableQuickFilter';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { useStoreState } from '@store/Store';
import { IndividualEventTableRowProps } from './IndividualEvent.types';

const IndividualEventViewedFilter: React.FC = () => {
  const recordingUrl: string = useStoreState(
    ({ db }) => db.event?.recordingUrl
  );

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
  const endTime: string = useStoreState(({ db }) => db.event?.endTime);
  const startTime: string = useStoreState(({ db }) => db.event?.startTime);

  const isUpcoming: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.UPCOMING;

  const filter: TableFilterFunction = (
    row: IndividualEventTableRowProps
  ): boolean => !!row.joinedAt;

  return <TableQuickFilter filter={filter} show={!isUpcoming} title="Joined" />;
};

const IndividualEventNoShowFilter: React.FC = () => {
  const endTime: string = useStoreState(({ db }) => db.event?.endTime);
  const startTime: string = useStoreState(({ db }) => db.event?.startTime);

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
