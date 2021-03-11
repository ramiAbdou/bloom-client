import { nanoid } from 'nanoid';
import React from 'react';

import Show from '@containers/Show';
import useTooltip from '@hooks/useTooltip';
import { ShowProps } from '@util/constants';
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
  const css: string = cx('o-story-nav', { 'o-story-nav--disabled': disabled });

  return <div ref={ref} className={css} onClick={onClick} />;
};

const StoryNavigation: React.FC<ShowProps> = ({ show }) => {
  const pageId = StoryStore.useStoreState((state) => state.pageId);

  const pages = StoryStore.useStoreState((store) =>
    store.pages.filter(({ id }) => id !== 'CONFIRMATION')
  );

  if (pageId === 'CONFIRMATION' || pages?.length <= 1) return null;

  return (
    <Show show={show}>
      <div className="o-story-nav-ctr">
        {pages.map(({ id }: StoryPageProps) => {
          return <StoryNavigationBar key={id ?? nanoid()} id={id} />;
        })}
      </div>
    </Show>
  );
};

export default StoryNavigation;
