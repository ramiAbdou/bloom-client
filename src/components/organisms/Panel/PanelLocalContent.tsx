import React from 'react';

import { useStoreState } from '@core/store/Store';
import DirectoryFilterPanel from '@scenes/Directory/DirectoryFilterPanel';
import { PanelType } from '@util/constants';
import TableColumnPanel from '../Table/TableColumnPanel';
import TableFilterPanel from '../Table/TableFilterPanel';

const PanelLocalContent: React.FC = () => {
  const panelId: PanelType = useStoreState(({ panel }) => panel.id);

  if (panelId === PanelType.FILTER_DIRECTORY) return <DirectoryFilterPanel />;
  if (panelId === PanelType.FILTER_TABLE) return <TableFilterPanel />;

  if (panelId === PanelType.TABLE_COLUMN) {
    return <TableColumnPanel />;
  }

  return null;
};

export default PanelLocalContent;
