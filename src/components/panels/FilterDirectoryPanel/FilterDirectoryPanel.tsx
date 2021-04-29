import React from 'react';

import Panel from '@components/organisms/Panel/Panel';
import DirectoryFilterPanelHeader from './DirectoryFilterPanelHeader';
import DirectoryFilterPanelQuestionList from './DirectoryFilterPanelQuestionList';

const DirectoryFilterPanel: React.FC = () => (
  <Panel align="BOTTOM_RIGHT" style={{ padding: 0 }}>
    <DirectoryFilterPanelHeader />
    <DirectoryFilterPanelQuestionList />
  </Panel>
);

export default DirectoryFilterPanel;
