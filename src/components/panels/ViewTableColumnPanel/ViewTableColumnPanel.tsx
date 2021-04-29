import React from 'react';

import Panel from '@components/organisms/Panel/Panel';
import { TableSortDirection } from '@components/organisms/Table/Table.types';
import ViewTableColumnPanelRenameForm from './ViewTableColumnPanelRenameForm';
import ViewTableColumnPanelSortButton from './ViewTableColumnPanelSortButton';

const ViewTableColumnPanel: React.FC = () => (
  <Panel align="BOTTOM_LEFT" className="o-table-col-panel">
    <ViewTableColumnPanelRenameForm />
    <ViewTableColumnPanelSortButton direction={TableSortDirection.ASC} />
    <ViewTableColumnPanelSortButton direction={TableSortDirection.DESC} />
  </Panel>
);

export default ViewTableColumnPanel;
