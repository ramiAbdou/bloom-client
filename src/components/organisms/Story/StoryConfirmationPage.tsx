import React, { useEffect } from 'react';

import ConfirmationScreen from '@containers/ConfirmationScreen/ConfirmationScreen';
import StoryStore from './Story.store';
import { StoryPageBranch } from './Story.types';

const StoryConfirmationPage: React.FC<StoryPageBranch> = ({
  description,
  title
}) => {
  const pageId = StoryStore.useStoreState((store) => store.pageId);
  const setPage = StoryStore.useStoreActions((store) => store.setPage);

  useEffect(() => {
    setPage({ id: 'CONFIRMATION' });
  }, []);

  if (pageId !== 'CONFIRMATION') return null;

  return (
    <ConfirmationScreen closeButton title={title}>
      <p>{description}</p>
    </ConfirmationScreen>
  );
};

export default StoryConfirmationPage;
