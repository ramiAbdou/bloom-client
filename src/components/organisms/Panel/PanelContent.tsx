import React from 'react';

import { useReactiveVar } from '@apollo/client';
import { panelVar } from '@core/state/Panel.state';
import IndividualEventAddRecordingPanelForm from '@scenes/Events/IndividualEventAddRecordingPanelForm';
import { PanelType } from '@util/constants';
import DirectoryFilterPanel from '../../../scenes/Directory/DirectoryFilterPanel';
import SidebarPanel from '../Sidebar/SidebarPanel';
import TableColumnPanel from '../Table/TableColumnPanel';
import TableFilterPanel from '../Table/TableFilterPanel';

const PanelContent: React.FC = () => {
  const panelId: string = useReactiveVar(panelVar)?.id;

  if (panelId === PanelType.ADD_RECORDING_LINK) {
    return <IndividualEventAddRecordingPanelForm />;
  }

  if (panelId === PanelType.FILTER_DIRECTORY) return <DirectoryFilterPanel />;
  if (panelId === PanelType.FILTER_TABLE) return <TableFilterPanel />;

  if (panelId === PanelType.TABLE_COLUMN) {
    return <TableColumnPanel />;
  }

  if (panelId === PanelType.PROFILE) return <SidebarPanel />;

  return null;
};

export default PanelContent;
