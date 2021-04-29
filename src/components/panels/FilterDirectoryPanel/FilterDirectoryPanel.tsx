import React from 'react';

import Panel from '@components/organisms/Panel/Panel';
import DirectoryFilterPanelHeader from './DirectoryFilterPanelHeader';
import DirectoryFilterPanelQuestionList from './DirectoryFilterPanelQuestionList';

const DirectoryFilterPanel: React.FC = () => (
  <Panel>
    <DirectoryFilterPanelHeader />
    <DirectoryFilterPanelQuestionList />
  </Panel>
);

export default DirectoryFilterPanel;
