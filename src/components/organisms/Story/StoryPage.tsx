import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import { cx } from '@util/util';
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
  confirmationClose,
  description,
  iconUrl,
  id,
  loading,
  show,
  title
}) => {
  id =
    (!!confirmation && 'CONFIRMATION') ||
    (!!id && id) ||
    (!!branches && Object.keys(branches)[0]);

  branchId = branchId ?? id;
  branches = branches ?? { [branchId]: { description, iconUrl, title } };

  const pageId = StoryStore.useStoreState((state) => state.pageId);
  const page = StoryStore.useStoreState(({ getPage }) => getPage(id));
  const setPage = StoryStore.useStoreActions((store) => store.setPage);

  useUpdateDisabledPage(id);

  useEffect(() => {
    if (show !== false) setPage({ branchId, branches, disabled: !!pageId, id });
  }, [show]);

  if (page?.id !== pageId || show === false) return null;

  const currentBranch: StoryPageBranch = page.branches[page.branchId];
  description = description ?? currentBranch.description;
  iconUrl = iconUrl ?? currentBranch.iconUrl;
  title = title ?? currentBranch.title;

  if (confirmation) {
    return (
      <StoryConfirmation closeButton={confirmationClose} title={title}>
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
        {iconUrl && <img src={iconUrl} />}
        <LoadingHeader loading={loading} title={title} />
        {description && <p>{description}</p>}
      </div>

      {!loading && children}
    </motion.div>
  );
};

export default StoryPage;
