import { Computed, computed, createContextStore } from 'easy-peasy';

import { StoryPageProps } from './Story.types';

export type StoryModel = {
  currentPage: Computed<StoryModel, StoryPageProps>;
  getPage: Computed<
    StoryModel,
    (pageId: string) => StoryPageProps,
    Record<string, any>
  >;
  pageId: string;
  pages: StoryPageProps[];
};

export const storyModel: StoryModel = {
  currentPage: computed(({ pageId, pages }) =>
    pages.find((page: StoryPageProps) => page.id === pageId)
  ),

  getPage: computed(({ pages }) => (pageId: string) =>
    pages.find((page: StoryPageProps) => page.id === pageId)
  ),

  pageId: null,

  pages: []
};

const StoryStore = createContextStore<StoryModel>(storyModel, {
  disableImmer: true
});

export default StoryStore;
