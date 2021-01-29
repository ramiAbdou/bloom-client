import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

import ConfirmationScreen from '@containers/ConfirmationScreen/ConfirmationScreen';
import LoadingHeader from '@containers/Loading/LoadingHeader';
import { cx } from '@util/util';
import StoryStore from './Story.store';
import { StoryPageBranch, StoryPageProps } from './Story.types';
import useUpdateDisabledPage from './useUpdateDisabledPage';

const StoryPage: React.FC<StoryPageProps> = ({
  branchId,
  branches,
  children,
  className,
  confirmation,
  confirmationClose,
  id
}) => {
  const branchKeys = Object.keys(branches);
  id = confirmation ? 'CONFIRMATION' : id ?? branchKeys[0];
  branchId = branchId ?? id;

  const pageId = StoryStore.useStoreState((store) => store.pageId);
  const page = StoryStore.useStoreState(({ getPage }) => getPage(id));
  const setPage = StoryStore.useStoreActions((store) => store.setPage);

  useUpdateDisabledPage(id);

  useEffect(() => {
    setPage({ branchId, branches, id });
  }, []);

  if (id !== pageId) return null;

  const currentBranch: StoryPageBranch = page.branches[page.branchId];
  const { description, iconUrl, loading, title } = currentBranch;

  if (confirmation) {
    return (
      <ConfirmationScreen closeButton={confirmationClose} title={title}>
        <p>{description}</p>
      </ConfirmationScreen>
    );
  }

  const css = cx('o-story-page', { [className]: className });

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
