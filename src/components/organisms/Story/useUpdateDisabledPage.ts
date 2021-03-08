import { useEffect } from 'react';

import StoryStore from './Story.store';

/**
 * Updates the story page's disabled status based on the current page index.
 * If the page is before the current page, it isn't disabled, otherwise it
 * is.
 */
const useUpdateDisabledPage = (id: string) => {
  const pageId = StoryStore.useStoreState((state) => state.pageId);
  const pages = StoryStore.useStoreState((state) => state.pages);

  const setPageDisabled = StoryStore.useStoreActions(
    (store) => store.setPageDisabled
  );

  const currentPageIndex = pages.findIndex((element) => element.id === pageId);
  const pageIndex = pages.findIndex((element) => element.id === id);
  const { disabled } = pages[pageIndex] ?? {};

  useEffect(() => {
    if (pageIndex >= 0) {
      setPageDisabled({ disabled: pageIndex > currentPageIndex, id });
    }
  }, [currentPageIndex, disabled, pageIndex]);
};

export default useUpdateDisabledPage;
