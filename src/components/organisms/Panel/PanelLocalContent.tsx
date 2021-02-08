import React from 'react';

import { PanelType } from '@constants';
import { useStoreState } from '@store/Store';
import TableColumnRenamePanel from '../Table/TableColumnRenamePanel';
import TableFilter from '../Table/TableFilter/TableFilter';

const PanelLocalContent: React.FC = () => {
  const panelId: string = useStoreState(({ panel }) => panel.id);

  if (panelId === PanelType.RENAME_TABLE_COLUMN) {
    return <TableColumnRenamePanel />;
  }

  if (panelId === PanelType.FILTER_TABLE) return <TableFilter />;
  return null;
};

export default PanelLocalContent;
