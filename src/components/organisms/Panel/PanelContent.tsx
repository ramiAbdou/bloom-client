import React from 'react';

import { useReactiveVar } from '@apollo/client';
import { panelVar } from '@components/organisms/Panel/Panel.state';
import AddRecordingLinkPanel from '@components/panels/AddRecordingLinkPanel/AddRecordingLinkPanel';
import FilterDirectoryPanel from '@components/panels/FilterDirectoryPanel/FilterDirectoryPanel';
import FilterTablePanel from '@components/panels/FilterTablePanel/FilterTablePanel';
import NavigateProfilePanel from '@components/panels/NavigateProfilePanel/NavigateProfilePanel';
import ViewTableColumnPanel from '@components/panels/ViewTableColumnPanel/ViewTableColumnPanel';
import { PanelType } from './Panel.types';

const PanelContent: React.FC = () => {
  const panelId: string = useReactiveVar(panelVar)?.id;

  switch (panelId) {
    case PanelType.ADD_RECORDING_LINK:
      return <AddRecordingLinkPanel />;

    case PanelType.FILTER_DIRECTORY:
      return <FilterDirectoryPanel />;

    case PanelType.FILTER_TABLE:
      return <FilterTablePanel />;

    case PanelType.NAVIGATE_PROFILE:
      return <NavigateProfilePanel />;

    case PanelType.VIEW_TABLE_COLUMN:
      return <ViewTableColumnPanel />;

    default:
      return null;
  }
};

export default PanelContent;
