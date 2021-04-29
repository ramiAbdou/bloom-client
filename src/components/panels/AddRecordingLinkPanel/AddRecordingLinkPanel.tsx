import React from 'react';

import Panel from '@components/organisms/Panel/Panel';
import AddRecordingLinkPanelForm from './AddRecordingLinkPanelForm';

const AddRecordingLinkPanel: React.FC = () => (
  <Panel align="BOTTOM_LEFT" size="lg">
    <AddRecordingLinkPanelForm />
  </Panel>
);

export default AddRecordingLinkPanel;
