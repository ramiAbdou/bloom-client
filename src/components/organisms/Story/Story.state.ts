import deepmerge from 'deepmerge';
import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

import { StoryAction, StoryState } from './Story.types';

const goForward = (state: StoryState) => {
  window.scrollTo({ top: 0 });

  const nextIndex =
    state.pages.findIndex((page) => page.id === state.pageId) + 1;

  const pageId: string = state.pages[nextIndex]?.id;
  return { ...state, pageId };
};

interface SetCurrentPageArgs {
  branchId: string;
  pageId: string;
}

const setCurrentPage = (
  state: StoryState,
  { branchId, pageId }: SetCurrentPageArgs
): StoryState => {
  window.scrollTo({ top: 0 });

  const updatedPages = [...state.pages];
  const index: number = updatedPages.findIndex((page) => page.id === pageId);
  updatedPages[index].branchId = branchId;

  return { ...state, pageId, pages: updatedPages };
};

const setPage = (state: StoryState, partialPage): StoryState => {
  const page = deepmerge(
    state.pages.find((value) => value.id === partialPage?.id),
    partialPage
  );

  return {
    ...state,
    pageId: state.pageId ?? page.id,
    pages: [...state.pages, page]
  };
};

interface SetPageDisabledArgs {
  disabled: boolean;
  pageId: string;
}

const setPageDisabled = (
  state: StoryState,
  { disabled, pageId }: SetPageDisabledArgs
): StoryState => {
  const updatedPages = [...state.pages];
  const index = updatedPages.findIndex((page) => page.id === pageId);
  updatedPages[index].disabled = disabled;
  return { ...state, pages: updatedPages };
};

// const setValue = (state: StoryState): StoryState => {};

const storyReducer = (state: StoryState, action: StoryAction): StoryState => {
  switch (action.type) {
    case 'GO_FORWARD':
      return goForward(state);

    case 'SET_CURRENT_PAGE':
      return setCurrentPage(state, { ...action });

    case 'SET_PAGE':
      return setPage(state, action.page);

    case 'SET_PAGE_DISABLED':
      return setPageDisabled(state, { ...action });

    default:
      return state;
  }
};

const useStoryValue = () => {
  const initialState: StoryState = {
    items: {},
    pageId: null,
    pages: []
  };

  return useReducer(storyReducer, initialState);
};

export const {
  Provider: StoryProvider,
  useTracked: useStory,
  useSelector: useStorySelector
} = createContainer(useStoryValue);

export const useStorySafe = () => {
  try {
    return useStory();
  } catch {
    return [null, null];
  }
};
