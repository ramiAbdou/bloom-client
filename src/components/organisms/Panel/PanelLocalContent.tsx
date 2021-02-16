import React from 'react';

import { PanelType } from '@constants';
import { useStoreState } from '@store/Store';
import ListFilter from '../List/ListFilter';
import TableFilter from '../Table/TableFilter/TableFilter';
import TableRenamePanel from '../Table/TableRenamePanel';

const PanelLocalContent: React.FC = () => {
  const panelId: string = useStoreState(({ panel }) => panel.id);

  if (panelId === PanelType.FILTER_LIST) return <ListFilter />;
  if (panelId === PanelType.FILTER_TABLE) return <TableFilter />;

  if (panelId === PanelType.RENAME_TABLE_COLUMN) {
    return <TableRenamePanel />;
  }

  return null;
};

export default PanelLocalContent;
