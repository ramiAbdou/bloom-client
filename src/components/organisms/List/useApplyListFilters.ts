import { useStoreActions } from '@store/Store';
import ListStore from './List.store';
import ListFilterStore from './ListFilter/ListFilter.store';

const useApplyListFilters = (): VoidFunction => {
  const closePanel = useStoreActions(({ panel }) => panel.closePanel);

  const setCustomFilters = ListStore.useStoreActions(
    (state) => state.setCustomFilters
  );

  const filters = ListFilterStore.useStoreState((state) => state.filters);

  const applyListFilters = () => {
    setCustomFilters(filters);
    closePanel();
  };

  return applyListFilters;
};

export default useApplyListFilters;
