import React from 'react';

import IndividualEventRecordingForm from '@scenes/Events/IndividualEvent/IndividualEventRecordingForm';
import { useStoreState } from '@store/Store';
import { PanelType } from '@util/constants';
import SidebarPanel from '../Sidebar/SidebarPanel';

const PanelContent: React.FC = () => {
  const panelId: string = useStoreState(({ panel }) => {
    return panel.id;
  });

  if (panelId === PanelType.ADD_RECORDING_LINK) {
    return <IndividualEventRecordingForm />;
  }

  if (panelId === PanelType.PROFILE) return <SidebarPanel />;

  return null;
};

export default PanelContent;
