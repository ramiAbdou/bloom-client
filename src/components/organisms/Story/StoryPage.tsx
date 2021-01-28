import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

import LoadingHeader from '@containers/Loading/LoadingHeader';
import { cx } from '@util/util';
import StoryStore from './Story.store';
import { StoryPageBranch, StoryPageProps } from './Story.types';

const StoryPage: React.FC<StoryPageProps> = ({
  branchId,
  branches,
  children,
  className,
  id
}) => {
  const branchKeys = Object.keys(branches);
  id = id ?? branchKeys[0];
  branchId = branchId ?? id;

  const pageId = StoryStore.useStoreState((store) => store.pageId);
  const page = StoryStore.useStoreState(({ getPage }) => getPage(id));
  const setPage = StoryStore.useStoreActions((store) => store.setPage);

  useEffect(() => {
    setPage({ branchId, branches, disabled: true, id });
  }, []);

  if (id !== pageId) return null;

  const currentBranch: StoryPageBranch = page.branches[page.branchId];
  const { description, iconUrl, loading, title } = currentBranch;

  const css = cx('o-form-page', { [className]: className });

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
        <p>{description}</p>
      </div>

      {!loading && children}
    </motion.div>
  );
};

export default StoryPage;

// const setPageDisabled = StoryStore.useStoreActions(
//   (store) => store.setPageDisabled
// );

// const currentPageIndex = pages.findIndex((element) => element.id === id);

// const pageIndex = pages.findIndex((element) => element.id === id);
// const { disabled } = pages[pageIndex] ?? {};

// if (Array.isArray(metadata)) {

// }

// useEffect(() => {
//   if (pageIndex >= 0 && disabled) {
//     setPageDisabled({ disabled: pageIndex > currentPageIndex, id });
//   }
// }, [disabled, pageIndex, isSamePage]);
