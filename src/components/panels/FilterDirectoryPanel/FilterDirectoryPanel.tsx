import React from 'react';

import Panel from '@components/organisms/Panel/Panel';
import FilterDirectoryPanelHeader from './FilterDirectoryPanelHeader';
import FilterDirectoryPanelQuestionList from './FilterDirectoryPanelQuestionList';

const FilterDirectoryPanel: React.FC = () => (
  <Panel align="BOTTOM_RIGHT" style={{ padding: 0 }}>
    <FilterDirectoryPanelHeader />
    <FilterDirectoryPanelQuestionList />
  </Panel>
);

export default FilterDirectoryPanel;
