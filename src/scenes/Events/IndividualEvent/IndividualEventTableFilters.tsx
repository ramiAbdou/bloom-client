import day from 'dayjs';
import React from 'react';

import Row from '@containers/Row/Row';
import { TableFilterFunction } from '@organisms/Table/TableFilterPanel/TableFilterPanel.types';
import TableQuickFilter from '@organisms/Table/TableQuickFilter';
import { useStoreState } from '@store/Store';
import { IndividualEventTableRowProps } from './IndividualEvent.types';

const IndividualEventViewedFilter: React.FC = () => {
  const recordingUrl = useStoreState(({ db }) => db.event?.recordingUrl);
  const show = !!recordingUrl;

  const filter: TableFilterFunction = (
    row: IndividualEventTableRowProps
  ): boolean => !!row.watched;

  return (
    <TableQuickFilter filter={filter} show={show} title="Viewed Recording" />
  );
};

const IndividualEventRsvpFilter: React.FC = () => {
  const startTime = useStoreState(({ db }) => db.event?.startTime);
  const show = day().isAfter(day(startTime));

  const filter: TableFilterFunction = (row: IndividualEventTableRowProps) =>
    !!row.rsvpdAt;

  return <TableQuickFilter filter={filter} show={show} title="RSVP'd" />;
};

const IndividualEventJoinedFilter: React.FC = () => {
  const startTime = useStoreState(({ db }) => db.event?.startTime);
  const show = day().isAfter(day(startTime));

  const filter: TableFilterFunction = (
    row: IndividualEventTableRowProps
  ): boolean => !!row.joinedAt;

  return <TableQuickFilter filter={filter} show={show} title="Joined" />;
};

const IndividualEventNoShowFilter: React.FC = () => {
  const startTime = useStoreState(({ db }) => db.event?.startTime);
  const show = day().isAfter(day(startTime));

  const filter: TableFilterFunction = (
    row: IndividualEventTableRowProps
  ): boolean => !!row.rsvpdAt && !row.joinedAt;

  return (
    <TableQuickFilter
      filter={filter}
      show={show}
      title="RSVP'd + Didn't Join"
    />
  );
};

const IndividualEventTableFilters: React.FC = () => {
  const show: boolean = useStoreState(
    ({ db }) =>
      !!db.event?.recordingUrl || day().isAfter(day(db.event.startTime))
  );

  return (
    <Row wrap gap="sm" show={show}>
      <IndividualEventJoinedFilter />
      <IndividualEventRsvpFilter />
      <IndividualEventViewedFilter />
      <IndividualEventNoShowFilter />
    </Row>
  );
};

export default IndividualEventTableFilters;
