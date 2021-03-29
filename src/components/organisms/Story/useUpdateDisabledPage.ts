import { useEffect } from 'react';

import StoryStore from './Story.store';
import { StoryPageProps } from './Story.types';

/**
 * Updates the story page's disabled status based on the current page index.
 * If the page is before the current page, it isn't disabled, otherwise it
 * is.
 */
const useUpdateDisabledPage = (id: string): void => {
  const pageId: string = StoryStore.useStoreState((state) => state.pageId);

  const pages: StoryPageProps[] = StoryStore.useStoreState(
    (state) => state.pages
  );

  const setPageDisabled = StoryStore.useStoreActions(
    (state) => state.setPageDisabled
  );

  const currentPageIndex: number = pages.findIndex(
    (element) => element.id === pageId
  );

  const pageIndex: number = pages.findIndex((element) => element.id === id);
  const { disabled } = pages[pageIndex] ?? {};

  useEffect(() => {
    if (pageIndex >= 0) {
      setPageDisabled({ disabled: pageIndex > currentPageIndex, id });
    }
  }, [currentPageIndex, disabled, pageIndex]);
};

export default useUpdateDisabledPage;
