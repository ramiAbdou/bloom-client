import deepmerge from 'deepmerge';
import {
  Action,
  action,
  Computed,
  computed,
  createContextStore
} from 'easy-peasy';

import { FormItemData, SetValueArgs } from '@organisms/Form/Form.types';
import { getError, getFormItemKey } from '@organisms/Form/Form.util';
import { StoryPageProps } from './Story.types';

export type StoryModel = {
  currentPage: Computed<StoryModel, StoryPageProps>;
  items: Record<string, FormItemData>;
  getPage: Computed<
    StoryModel,
    (pageId: string) => StoryPageProps,
    Record<string, any>
  >;
  goForward: Action<StoryModel>;
  pageId: string;
  pages: StoryPageProps[];
  setCurrentPage: Action<StoryModel, Pick<StoryPageProps, 'id' | 'branchId'>>;
  setItem: Action<StoryModel, Partial<FormItemData>>;
  setPage: Action<StoryModel, Partial<StoryPageProps>>;
  setPageDisabled: Action<StoryModel, Pick<StoryPageProps, 'disabled' | 'id'>>;
  setPageId: Action<StoryModel, string>;
  setValue: Action<StoryModel, SetValueArgs>;
};

export const storyModel: StoryModel = {
  currentPage: computed(({ pageId, pages }) =>
    pages.find((page: StoryPageProps) => page.id === pageId)
  ),

  getPage: computed(({ pages }) => (pageId: string) =>
    pages.find((page: StoryPageProps) => page.id === pageId)
  ),

  goForward: action(({ pages, pageId, ...state }) => {
    window.scrollTo({ top: 0 });

    const nextIndex = pages.findIndex((page) => page.id === pageId) + 1;
    const { id } = pages[nextIndex];
    return { ...state, pageId: id, pages };
  }),

  items: {},

  pageId: null,

  pages: [],

  setCurrentPage: action(
    (
      { pages, ...state },
      { branchId, id }: Pick<StoryPageProps, 'id' | 'branchId'>
    ) => {
      window.scrollTo({ top: 0 });

      const index = pages.findIndex((page) => page.id === id);

      pages[index].branchId = branchId;
      return { ...state, pageId: id, pages };
    }
  ),

  setItem: action(({ items, ...state }, item: Partial<FormItemData>) => {
    const key: string = getFormItemKey(item);
    const updatedItems = { [key]: { ...items[key], ...item } };
    return { ...state, items: { ...items, ...updatedItems } };
  }),

  setPage: action((state, partialPage) => {
    const { getPage, pageId, pages } = state;
    const page = deepmerge(getPage(partialPage?.id), partialPage);
    return { ...state, pageId: pageId ?? page.id, pages: [...pages, page] };
  }),

  setPageDisabled: action(
    (
      { pages, ...state },
      { disabled, id }: Pick<StoryPageProps, 'disabled' | 'id'>
    ) => {
      const index = pages.findIndex((page) => page.id === id);

      pages[index].disabled = disabled;
      return { ...state, pages };
    }
  ),

  setPageId: action((state, pageId: string) => {
    return { ...state, pageId };
  }),

  setValue: action(({ items, ...state }, { key, value }: SetValueArgs) => {
    const updatedItem = { ...items[key], value };

    return {
      ...state,
      items: {
        ...items,
        [key]: { ...updatedItem, error: getError(updatedItem) }
      }
    };
  })
};

const StoryStore = createContextStore<StoryModel>(storyModel, {
  disableImmer: true
});

export default StoryStore;
