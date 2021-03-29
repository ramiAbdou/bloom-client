import React from 'react';

import TableColumnPanelRenameForm from './TableColumnPanelRenameForm';
import TableSortButton from './TableSort/TableSortButton';

const TableColumnPanel: React.FC = () => (
  <>
    <TableColumnPanelRenameForm />
    <TableSortButton direction="ASC" />
    <TableSortButton direction="DESC" />
  </>
);

export default TableColumnPanel;
