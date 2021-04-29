import React from 'react';

import Row from '@components/containers/Row/Row';
import Panel from '@components/organisms/Panel/Panel';
import { useTable } from '@components/organisms/Table/Table.state';
import TableFilterPanelActions from './FilterTablePanelActions';
import TableFilterPanelAddButton from './FilterTablePanelAddButton';
import TableFilterPanelClearButton from './FilterTablePanelClearButton';
import TableFilterPanelRow from './FilterTablePanelRow';

const TableFilterPanelHeader: React.FC = () => (
  <Row className="mb-sm--nlc" justify="sb" spacing="xs">
    <h3>Filters</h3>
    <TableFilterPanelClearButton />
  </Row>
);

const TableFilterPanelRowList: React.FC = () => {
  const [{ allFilterIds }] = useTable();

  return (
    <ul className="mb-sm--nlc">
      {allFilterIds.map((filterId: string) => (
        <TableFilterPanelRow key={filterId} id={filterId} />
      ))}
    </ul>
  );
};

const TableFilterPanel: React.FC = () => (
  <Panel align="BOTTOM_RIGHT">
    <TableFilterPanelHeader />
    <TableFilterPanelRowList />
    <TableFilterPanelAddButton />
    <TableFilterPanelActions />
  </Panel>
);

export default TableFilterPanel;
