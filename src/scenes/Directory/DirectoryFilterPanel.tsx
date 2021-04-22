import React from 'react';

import DirectoryFilterPanelHeader from './DirectoryFilterPanelHeader';
import DirectoryFilterPanelQuestionList from './DirectoryFilterPanelQuestionList';

const DirectoryFilterPanel: React.FC = () => {
  console.log('HERE');
  return (
    <>
      <DirectoryFilterPanelHeader />
      <DirectoryFilterPanelQuestionList />
    </>
  );
};

export default DirectoryFilterPanel;
