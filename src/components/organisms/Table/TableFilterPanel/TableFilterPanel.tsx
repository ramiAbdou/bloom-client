import React from 'react';

import Row from '@containers/Row/Row';
import IdStore from '@store/Id.store';
import TableFilterPanelStore from './TableFilterPanel.store';
import TableFilterPanelActions from './TableFilterPanelActions';
import TableFilterPanelAddButton from './TableFilterPanelAddButton';
import TableFilterPanelClearButton from './TableFilterPanelClearButton';
import TableFilterPanelRow from './TableFilterPanelRow';

const TableFilterPanelHeader: React.FC = () => (
  <Row className="mb-sm--nlc" justify="sb" spacing="xs">
    <h3>Filters</h3>
    <TableFilterPanelClearButton />
  </Row>
);

const TableFilterPanelRowList: React.FC = () => {
  const filterIds: string[] = TableFilterPanelStore.useStoreState(
    (state) => state.filterIds
  );

  return (
    <ul className="mb-sm--nlc">
      {filterIds.map((id: string) => (
        <IdStore.Provider key={id} runtimeModel={{ id }}>
          <TableFilterPanelRow />
        </IdStore.Provider>
      ))}
    </ul>
  );
};

const TableFilterPanel: React.FC = () => (
  <>
    <TableFilterPanelHeader />
    <TableFilterPanelRowList />
    <TableFilterPanelAddButton />
    <TableFilterPanelActions />
  </>
);

export default TableFilterPanel;
