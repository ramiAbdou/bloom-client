import React from 'react';

import { ChildrenProps } from '@constants';
import StoryStore from './Story.store';
import StoryNavigation from './StoryNavigation';

const StoryContent: React.FC<ChildrenProps> = ({ children }) => {
  const hasPages = StoryStore.useStoreState((store) => !!store.pages?.length);

  return (
    <>
      <StoryNavigation show={hasPages} />
      {children}
    </>
  );
};

const Story: React.FC<ChildrenProps> = (props) => (
  <StoryStore.Provider>
    <StoryContent {...props} />
  </StoryStore.Provider>
);

export default Story;
