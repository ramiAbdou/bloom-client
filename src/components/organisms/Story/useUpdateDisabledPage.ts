import { useEffect } from 'react';

import StoryStore from './Story.store';

const useUpdateDisabledPage = (id: string) => {
  const pageId = StoryStore.useStoreState((store) => store.pageId);
  const pages = StoryStore.useStoreState((store) => store.pages);

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
