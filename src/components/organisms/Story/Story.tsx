import React from 'react';

import { StoryProvider, useStorySelector } from './Story.state';
import StoryNavigation from './StoryNavigation';

const StoryContent: React.FC = ({ children }) => {
  const hasPages = useStorySelector((state) => !!state.pages?.length);

  return (
    <>
      <StoryNavigation show={hasPages} />
      {children}
    </>
  );
};

const Story: React.FC = ({ children }) => (
  <StoryProvider>
    <StoryContent>{children}</StoryContent>
  </StoryProvider>
);

export default Story;
