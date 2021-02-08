import React from 'react';

import { PanelType } from '@constants';
import IndividualEventRecordingForm from '@scenes/Events/IndividualEvent/IndividualEventRecordingForm';
import { useStoreState } from '@store/Store';
import SidebarPanel from '../Nav/SideBarPanel';

const PanelContent: React.FC = () => {
  const panelId: string = useStoreState(({ panel }) => panel.id);

  if (panelId === PanelType.ADD_RECORDING_LINK) {
    return <IndividualEventRecordingForm />;
  }

  if (panelId === PanelType.PROFILE) return <SidebarPanel />;

  return null;
};

export default PanelContent;
