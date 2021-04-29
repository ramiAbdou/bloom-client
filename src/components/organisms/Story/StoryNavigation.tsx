import { nanoid } from 'nanoid';
import React from 'react';

import Show from '@components/containers/Show';
import useTooltip from '@hooks/useTooltip';
import { ShowProps } from '@util/constants';
import { cx } from '@util/util';
import { useStory, useStorySelector } from './Story.state';
import { StoryPageProps } from './Story.types';

const StoryNavigationBar: React.FC<StoryPageProps> = ({ id }) => {
  const [, storyDispatch] = useStory();

  const page = useStorySelector(({ pages }) =>
    pages.find((value) => value.id === id)
  );

  const { disabled, branches, branchId } = page;
  const title = branches[branchId]?.title;
  const ref: React.LegacyRef<any> = useTooltip(title);

  const onClick = (): void => {
    if (!disabled) {
      storyDispatch({ branchId, pageId: id, type: 'SET_CURRENT_PAGE' });
    }
  };

  const css: string = cx('o-story-nav', { 'o-story-nav--disabled': disabled });

  return <div ref={ref} className={css} onClick={onClick} />;
};

const StoryNavigation: React.FC<ShowProps> = ({ show }) => {
  const [{ pageId }] = useStory();

  const pages = useStorySelector((state) =>
    state.pages.filter(({ id }) => id !== 'CONFIRMATION')
  );

  if (pageId === 'CONFIRMATION' || pages?.length <= 1) return null;

  return (
    <Show show={show}>
      <div className="o-story-nav-ctr">
        {pages.map(({ id }: StoryPageProps) => (
          <StoryNavigationBar key={id ?? nanoid()} id={id} />
        ))}
      </div>
    </Show>
  );
};

export default StoryNavigation;
