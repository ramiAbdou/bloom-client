import React from 'react';

import { PanelType } from '@constants';
import Row from '@containers/Row/Row';
import Panel from '@organisms/Panel/Panel';
import IdStore from '@store/Id.store';
import TableFilterStore from './TableFilter.store';
import TableFilterActions from './TableFIlterActions';
import TableFilterAddButton from './TableFilterAddButton';
import TableFilterClearButton from './TableFilterClearButton';
import TableFilterRow from './TableFilterRow';

const TableFilterHeader: React.FC = () => {
  return (
    <Row spaceBetween className="mb-sm">
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
    <Panel align="BOTTOM_RIGHT" id={PanelType.TABLE_FILTER}>
      <TableFilterHeader />
      <TableFilterRows />
      <TableFilterAddButton />
      <TableFilterActions />
    </Panel>
  );
};

export default TableFilter;
