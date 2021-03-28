import { useStoreActions } from '@store/Store';
import ListStore from './List.store';
import ListFilterStore from './ListFilter/ListFilter.store';
import { ListFilterArgs } from './ListFilter/ListFilter.types';

const useApplyListFilters = (): VoidFunction => {
  const closePanel = useStoreActions(({ panel }) => {
    return panel.closePanel;
  });

  const setCustomFilters = ListStore.useStoreActions((state) => {
    return state.setCustomFilters;
  });

  const filters: Record<string, ListFilterArgs> = ListFilterStore.useStoreState(
    (state) => {
      return state.filters;
    }
  );

  const applyListFilters = () => {
    setCustomFilters(filters);
    closePanel();
  };

  return applyListFilters;
};

export default useApplyListFilters;
