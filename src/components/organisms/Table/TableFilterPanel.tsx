import React from 'react';

import Row from '@components/containers/Row/Row';
import { useTableState } from './Table.state';
import { TableState } from './Table.types';
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
  const { allFilterIds }: TableState = useTableState();

  return (
    <ul className="mb-sm--nlc">
      {allFilterIds.map((filterId: string) => (
        <TableFilterPanelRow key={filterId} id={filterId} />
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
