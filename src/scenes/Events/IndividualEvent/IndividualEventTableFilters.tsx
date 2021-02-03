import day from 'dayjs';
import React from 'react';

import Row from '@containers/Row/Row';
import { TableFilter } from '@organisms/Table/Table.types';
import TableQuickFilter from '@organisms/Table/TableQuickFilter';
import { useStoreState } from '@store/Store';

const IndividualEventViewedFilter: React.FC = () => {
  const recordingUrl = useStoreState(({ db }) => db.event?.recordingUrl);
  const filter: TableFilter = (row) => row.watched === 'Yes';

  return (
    <TableQuickFilter
      filter={filter}
      id="VIEWED_RECORDING"
      show={!!recordingUrl}
      title="Viewed Recording"
    />
  );
};

const IndividualEventRsvpFilter: React.FC = () => {
  const startTime = useStoreState(({ db }) => db.event?.startTime);
  const filter: TableFilter = (row) => !!row.rsvpdAt;

  return (
    <TableQuickFilter
      filter={filter}
      id="RSVP"
      show={day().isAfter(day(startTime))}
      title="RSVP'd"
    />
  );
};

const IndividualEventJoinedFilter: React.FC = () => {
  const startTime = useStoreState(({ db }) => db.event?.startTime);
  const filter: TableFilter = (row) => !!row.joinedAt;

  return (
    <TableQuickFilter
      filter={filter}
      id="RSVP"
      show={day().isAfter(day(startTime))}
      title="Joined"
    />
  );
};

const IndividualEventNoShowFilter: React.FC = () => {
  const endTime = useStoreState(({ db }) => db.event?.endTime);
  const filter: TableFilter = (row) => !!row.rsvpdAt && !row.joinedAt;

  return (
    <TableQuickFilter
      filter={filter}
      id="RSVP_NO_SHOW"
      show={day().isAfter(day(endTime))}
      title="RSVP'd + Didn't Join"
    />
  );
};

const IndividualEventNoShowAndFilter: React.FC = () => {
  const recordingUrl = useStoreState(({ db }) => db.event?.recordingUrl);
  const filter: TableFilter = (row) => row.watched === 'Yes' && !row.joinedAt;

  return (
    <TableQuickFilter
      filter={filter}
      id="NO_SHOW_VIEWED_RECORDING"
      show={!!recordingUrl}
      title="No Show + Viewed Recording"
    />
  );
};

const IndividualEventTableFilters: React.FC = () => {
  return (
    <Row marginBottom={12}>
      <IndividualEventJoinedFilter />
      <IndividualEventRsvpFilter />
      <IndividualEventViewedFilter />
      <IndividualEventNoShowFilter />
      <IndividualEventNoShowAndFilter />
    </Row>
  );
};

export default IndividualEventTableFilters;
