import React from 'react';

import { PanelType } from '@constants';
import Row from '@containers/Row/Row';
import Panel from '@organisms/Panel/Panel';
import TableFilterStore from './TableFilter.store';
import TableFilterActions from './TableFIlterActions';
import TableFilterAddButton from './TableFilterAddButton';
import TableFilterClearButton from './TableFilterClearButton';
import TableFilterRow from './TableFilterRow';

const TableFilterPanel: React.FC = () => {
  const filterIds: string[] = TableFilterStore.useStoreState((store) =>
    Object.keys(store.filters)
  );

  return (
    <Panel align="BOTTOM_RIGHT" id={PanelType.TABLE_FILTER}>
      <Row spaceBetween className="mb-sm">
        <h3>Filters</h3>
        <TableFilterClearButton />
      </Row>

      <ul className="mb-sm">
        {filterIds.map((id: string) => {
          return <TableFilterRow key={id} id={id} />;
        })}
      </ul>

      <TableFilterAddButton />
      <TableFilterActions />
    </Panel>
  );
};

const TableFilter: React.FC = () => {
  return (
    <TableFilterStore.Provider>
      <TableFilterPanel />
    </TableFilterStore.Provider>
  );
};

export default TableFilter;
