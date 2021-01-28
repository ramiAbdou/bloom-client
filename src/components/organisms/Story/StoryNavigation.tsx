import { nanoid } from 'nanoid';
import React from 'react';

import useTooltip from '@hooks/useTooltip';
import { cx } from '@util/util';
import StoryStore from './Story.store';
import { StoryPageProps } from './Story.types';

const StoryNavigationBar: React.FC<StoryPageProps> = ({ id }) => {
  const page = StoryStore.useStoreState(({ getPage }) => getPage(id));

  const setCurrentPage = StoryStore.useStoreActions(
    (store) => store.setCurrentPage
  );

  const { disabled, branches, branchId } = page;
  const title = branches[branchId]?.title;

  const ref: React.LegacyRef<any> = useTooltip(title);
  const onClick = () => !disabled && setCurrentPage({ branchId, id });
  const css = cx('o-form-nav', { 'o-form-nav--disabled': disabled });

  return <div ref={ref} className={css} onClick={onClick} />;
};

const StoryNavigation: React.FC = () => {
  const pages = StoryStore.useStoreState((store) =>
    store.pages.filter(({ id }) => id !== 'CONFIRMATION')
  );

  if (pages?.length <= 1) return null;

  return (
    <div className="o-form-nav-ctr">
      {pages.map(({ id }: StoryPageProps) => {
        return <StoryNavigationBar key={id ?? nanoid()} id={id} />;
      })}
    </div>
  );
};

export default StoryNavigation;
