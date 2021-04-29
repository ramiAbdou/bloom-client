import React from 'react';

import Panel from '@components/organisms/Panel/Panel';
import { TableSortDirection } from '@components/organisms/Table/Table.types';
import TableSortButton from '../../organisms/Table/TableSortButton';
import ViewTableColumnPanelRenameForm from './ViewTableColumnPanelRenameForm';

const TableColumnPanel: React.FC = () => (
  <Panel align="BOTTOM_LEFT" className="o-table-col-panel">
    <ViewTableColumnPanelRenameForm />
    <TableSortButton direction={TableSortDirection.ASC} />
    <TableSortButton direction={TableSortDirection.DESC} />
  </Panel>
);

export default TableColumnPanel;
