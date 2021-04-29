import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

import LoadingHeader from '@components/containers/LoadingHeader/LoadingHeader';
import { cx, take } from '@util/util';
import { useStory } from './Story.state';
import StoryStore from './Story.store';
import { StoryPageBranch, StoryPageProps } from './Story.types';
import StoryConfirmation from './StoryConfirmation';
import useUpdateDisabledPage from './useUpdateDisabledPage';

const StoryPage: React.FC<StoryPageProps> = ({
  branchId,
  branches,
  children,
  className,
  confirmation,
  description,
  iconUrl,
  id,
  loading,
  show,
  title
}) => {
  const [, storyDispatch] = useStory();

  id = take([
    [confirmation, 'CONFIRMATION'],
    [id, id],
    [branches, branches && Object.keys(branches)[0]]
  ]) as string;

  branchId = branchId ?? id;
  branches = branches ?? { [branchId]: { description, iconUrl, title } };

  const pageId = StoryStore.useStoreState((state) => state.pageId);
  const page = StoryStore.useStoreState(({ getPage }) => getPage(id));

  useUpdateDisabledPage(id);

  useEffect(() => {
    if (show !== false) {
      storyDispatch({
        page: { branchId, branches, disabled: !!pageId, id },
        type: 'SET_PAGE'
      });
    }
  }, [show]);

  if (page?.id !== pageId || show === false) return null;

  const currentBranch: StoryPageBranch = page.branches[page.branchId];
  description = description ?? currentBranch.description;
  iconUrl = iconUrl ?? currentBranch.iconUrl;
  title = title ?? currentBranch.title;

  if (confirmation) {
    return (
      <StoryConfirmation title={title}>
        <p>{description}</p>
      </StoryConfirmation>
    );
  }

  const css: string = cx('o-story-page', {}, className);

  return (
    <motion.div
      animate={{ x: 0 }}
      className={css}
      initial={{ x: 50 }}
      transition={{ duration: 0.2 }}
    >
      <div>
        {iconUrl && <img alt="Community Logo" src={iconUrl} />}
        <LoadingHeader loading={loading} title={title} />
        {description && <p>{description}</p>}
      </div>

      {!loading && children}
    </motion.div>
  );
};

export default StoryPage;
