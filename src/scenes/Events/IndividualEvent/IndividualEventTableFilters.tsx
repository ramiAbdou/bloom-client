import day from 'dayjs';
import React from 'react';

import Row from '@containers/Row/Row';
import { TableFilter } from '@organisms/Table/Table.types';
import TableQuickFilter from '@organisms/Table/TableQuickFilter';
import { useStoreState } from '@store/Store';
import { IndividualEventTableRowProps } from './IndividualEvent.types';

const IndividualEventViewedFilter: React.FC = () => {
  const recordingUrl = useStoreState(({ db }) => {
    return db.event?.recordingUrl;
  });

  const show = !!recordingUrl;

  const filter: TableFilter = (row: IndividualEventTableRowProps): boolean => {
    return !!row.watched;
  };

  return (
    <TableQuickFilter filter={filter} show={show} title="Viewed Recording" />
  );
};

const IndividualEventRsvpFilter: React.FC = () => {
  const startTime = useStoreState(({ db }) => {
    return db.event?.startTime;
  });

  const show = day().isAfter(day(startTime));

  const filter: TableFilter = (row: IndividualEventTableRowProps) => {
    return !!row.rsvpdAt;
  };

  return <TableQuickFilter filter={filter} show={show} title="RSVP'd" />;
};

const IndividualEventJoinedFilter: React.FC = () => {
  const startTime = useStoreState(({ db }) => {
    return db.event?.startTime;
  });

  const show = day().isAfter(day(startTime));

  const filter: TableFilter = (row: IndividualEventTableRowProps): boolean => {
    return !!row.joinedAt;
  };

  return <TableQuickFilter filter={filter} show={show} title="Joined" />;
};

const IndividualEventNoShowFilter: React.FC = () => {
  const startTime = useStoreState(({ db }) => {
    return db.event?.startTime;
  });

  const show = day().isAfter(day(startTime));

  const filter: TableFilter = (row: IndividualEventTableRowProps): boolean => {
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

const IndividualEventTableFilters: React.FC = () => {
  const show: boolean = useStoreState(({ db }) => {
    return !!db.event?.recordingUrl || day().isAfter(day(db.event.startTime));
  });

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
