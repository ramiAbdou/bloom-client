import React from 'react';

import StoryStore from './Story.store';
import StoryNavigation from './StoryNavigation';

const StoryContent: React.FC = ({ children }) => {
  const hasPages = StoryStore.useStoreState((state) => !!state.pages?.length);

  return (
    <>
      <StoryNavigation show={hasPages} />
      {children}
    </>
  );
};

const Story: React.FC = ({ children }) => (
  <StoryStore.Provider>
    <StoryContent>{children}</StoryContent>
  </StoryStore.Provider>
);

export default Story;
