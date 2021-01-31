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
  description,
  iconUrl,
  id,
  show,
  title
}) => {
  id =
    (!!confirmation && 'CONFIRMATION') ||
    (!!id && id) ||
    (!!branches && Object.keys(branches)[0]);

  branchId = branchId ?? id;
  branches = branches ?? { [branchId]: { description, iconUrl, title } };

  const pageId = StoryStore.useStoreState((store) => store.pageId);
  const page = StoryStore.useStoreState(({ getPage }) => getPage(id));
  const setPage = StoryStore.useStoreActions((store) => store.setPage);

  useUpdateDisabledPage(id);

  useEffect(() => {
    if (show !== false) setPage({ branchId, branches, id });
  }, [show]);

  if (page?.id !== pageId || show === false) return null;

  const { loading, ...currentBranch }: StoryPageBranch = page.branches[
    page.branchId
  ];

  description = description ?? currentBranch.description;
  iconUrl = iconUrl ?? currentBranch.iconUrl;
  title = title ?? currentBranch.title;

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
