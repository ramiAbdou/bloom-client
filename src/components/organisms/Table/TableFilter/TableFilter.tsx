import React from 'react';

import Row from '@containers/Row/Row';
import IdStore from '@store/Id.store';
import TableFilterStore from './TableFilter.store';
import TableFilterActions from './TableFIlterActions';
import TableFilterAddButton from './TableFilterAddButton';
import TableFilterClearButton from './TableFilterClearButton';
import TableFilterRow from './TableFilterRow';

const TableFilterHeader: React.FC = () => {
  return (
    <Row className="mb-sm" justify="sb" spacing="xs">
      <h3>Filters</h3>
      <TableFilterClearButton />
    </Row>
  );
};

const TableFilterRows: React.FC = () => {
  const filterIds: string[] = TableFilterStore.useStoreState((store) => {
    return store.filterIds;
  });

  return (
    <ul className="mb-sm">
      {filterIds.map((id: string) => {
        return (
          <IdStore.Provider key={id} runtimeModel={{ id }}>
            <TableFilterRow />
          </IdStore.Provider>
        );
      })}
    </ul>
  );
};

const TableFilter: React.FC = () => {
  return (
    <>
      <TableFilterHeader />
      <TableFilterRows />
      <TableFilterAddButton />
      <TableFilterActions />
    </>
  );
};

export default TableFilter;
