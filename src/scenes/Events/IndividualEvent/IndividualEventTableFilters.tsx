import React from 'react';

import Row from '@containers/Row/Row';
import { TableFilter } from '@organisms/Table/Table.types';
import TableQuickFilter from '@organisms/Table/TableQuickFilter';

const IndividualEventViewedFilter: React.FC = () => {
  const filter: TableFilter = (row) => row.watched === 'Yes';
  return (
    <TableQuickFilter
      filter={filter}
      id="VIEWED_RECORDING"
      title="Viewed Recording"
    />
  );
};

const IndividualEventRsvpFilter: React.FC = () => {
  const filter: TableFilter = (row) => !!row.rsvpdAt;
  return <TableQuickFilter filter={filter} id="RSVP" title="RSVP'd" />;
};

const IndividualEventNoShowFilter: React.FC = () => {
  const filter: TableFilter = (row) => !!row.rsvpdAt && !row.joinedAt;
  return (
    <TableQuickFilter
      filter={filter}
      id="RSVP_NO_SHOW"
      title="RSVP'd + No Show"
    />
  );
};

const IndividualEventNoShowAndFilter: React.FC = () => {
  const filter: TableFilter = (row) => row.watched === 'Yes' && !row.joinedAt;

  return (
    <TableQuickFilter
      filter={filter}
      id="NO_SHOW_VIEWED_RECORDING"
      title="No Show + Viewed Recording"
    />
  );
};

const IndividualEventTableFilters: React.FC = () => {
  return (
    <Row marginBottom={12}>
      <IndividualEventRsvpFilter />
      <IndividualEventViewedFilter />
      <IndividualEventNoShowFilter />
      <IndividualEventNoShowAndFilter />
    </Row>
  );
};

export default IndividualEventTableFilters;
