import React from 'react';

import { TableSortDirection } from './Table.types';
import TableColumnPanelRenameForm from './TableColumnPanelRenameForm';
import TableSortButton from './TableSortButton';

const TableColumnPanel: React.FC = () => (
  <>
    <TableColumnPanelRenameForm />
    <TableSortButton direction={TableSortDirection.ASC} />
    <TableSortButton direction={TableSortDirection.DESC} />
  </>
);

export default TableColumnPanel;
