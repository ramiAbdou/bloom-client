import day from 'dayjs';
import React from 'react';

import Row from '@containers/Row/Row';
import { TableFilter } from '@organisms/Table/Table.types';
import TableQuickFilter from '@organisms/Table/TableQuickFilter';
import { useStoreState } from '@store/Store';
import { IndividualEventTableRowProps } from './IndividualEvent.types';

const IndividualEventViewedFilter: React.FC = () => {
  const recordingUrl = useStoreState(({ db }) => db.event?.recordingUrl);
  const show = !!recordingUrl;

  const filter: TableFilter = (row: IndividualEventTableRowProps) => {
    return !!row.watched;
  };

  return (
    <TableQuickFilter filter={filter} show={show} title="Viewed Recording" />
  );
};

const IndividualEventRsvpFilter: React.FC = () => {
  const startTime = useStoreState(({ db }) => db.event?.startTime);
  const show = day().isAfter(day(startTime));

  const filter: TableFilter = (row: IndividualEventTableRowProps) => {
    return !!row.rsvpdAt;
  };

  return <TableQuickFilter filter={filter} show={show} title="RSVP'd" />;
};

const IndividualEventJoinedFilter: React.FC = () => {
  const startTime = useStoreState(({ db }) => db.event?.startTime);
  const show = day().isAfter(day(startTime));

  const filter: TableFilter = (row: IndividualEventTableRowProps) => {
    return !!row.joinedAt;
  };

  return <TableQuickFilter filter={filter} show={show} title="Joined" />;
};

const IndividualEventNoShowFilter: React.FC = () => {
  const startTime = useStoreState(({ db }) => db.event?.startTime);
  const show = day().isAfter(day(startTime));

  const filter: TableFilter = (row: IndividualEventTableRowProps) => {
    return !!row.rsvpdAt && !row.joinedAt;
  };

  return (
    <TableQuickFilter
      filter={filter}
      show={show}
      title="RSVP'd + Didn't Join"
    />
  );
};

const IndividualEventNoShowAndFilter: React.FC = () => {
  const recordingUrl = useStoreState(({ db }) => db.event?.recordingUrl);
  const show = !!recordingUrl;

  const filter: TableFilter = (row: IndividualEventTableRowProps) => {
    return !!row.watched && !row.joinedAt;
  };

  return (
    <TableQuickFilter
      filter={filter}
      show={show}
      title="No Show + Viewed Recording"
    />
  );
};

const IndividualEventTableFilters: React.FC = () => {
  const show: boolean = useStoreState(({ db }) => {
    return !!db.event?.recordingUrl || day().isAfter(day(db.event.startTime));
  });

  return (
    <Row wrap show={show} spacing="sm">
      <IndividualEventJoinedFilter />
      <IndividualEventRsvpFilter />
      <IndividualEventViewedFilter />
      <IndividualEventNoShowFilter />
      <IndividualEventNoShowAndFilter />
    </Row>
  );
};

export default IndividualEventTableFilters;
