import React from 'react';

import { useStoreState } from '@store/Store';
import { PanelType } from '@util/constants';
import ListFilter from '../List/ListFilter/ListFilter';
import TableColumnPanel from '../Table/TableColumnPanel';
import TableFilter from '../Table/TableFilter/TableFilter';

const PanelLocalContent: React.FC = () => {
  const panelId: PanelType = useStoreState(({ panel }) => {
    return panel.id;
  });

  if (panelId === PanelType.FILTER_LIST) return <ListFilter />;
  if (panelId === PanelType.FILTER_TABLE) return <TableFilter />;

  if (panelId === PanelType.TABLE_COLUMN) {
    return <TableColumnPanel />;
  }

  return null;
};

export default PanelLocalContent;
