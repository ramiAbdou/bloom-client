import React from 'react';

import StoryStore from './Story.store';
import StoryNavigation from './StoryNavigation';

const StoryContent: React.FC = ({ children }) => {
  const hasPages = StoryStore.useStoreState((store) => !!store.pages?.length);

  return (
    <>
      <StoryNavigation show={hasPages} />
      {children}
    </>
  );
};

const Story: React.FC = (props) => (
  <StoryStore.Provider>
    <StoryContent {...props} />
  </StoryStore.Provider>
);

export default Story;
