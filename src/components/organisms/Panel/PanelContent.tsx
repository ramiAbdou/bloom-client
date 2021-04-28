import React from 'react';

import { useStoreState } from '@core/store/Store';
import IndividualEventAddRecordingPanelForm from '@scenes/Events/IndividualEventAddRecordingPanelForm';
import { PanelType } from '@util/constants';
import SidebarPanel from '../Sidebar/SidebarPanel';

const PanelContent: React.FC = () => {
  const panelId: string = useStoreState(({ panel }) => panel.id);

  if (panelId === PanelType.ADD_RECORDING_LINK) {
    return <IndividualEventAddRecordingPanelForm />;
  }

  if (panelId === PanelType.PROFILE) return <SidebarPanel />;

  return null;
};

export default PanelContent;
