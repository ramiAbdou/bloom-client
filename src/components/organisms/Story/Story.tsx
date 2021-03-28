import React from 'react';

import StoryStore from './Story.store';
import StoryNavigation from './StoryNavigation';

const StoryContent: React.FC = ({ children }) => {
  const hasPages = StoryStore.useStoreState((state) => {
    return !!state.pages?.length;
  });

  return (
    <>
      <StoryNavigation show={hasPages} />
      {children}
    </>
  );
};

const Story: React.FC = ({ children }) => {
  return (
    <StoryStore.Provider>
      <StoryContent>{children}</StoryContent>
    </StoryStore.Provider>
  );
};

export default Story;
