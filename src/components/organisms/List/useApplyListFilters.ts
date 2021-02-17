import { useStoreActions } from '@store/Store';
import ListStore from './List.store';
import ListFilterStore from './ListFilter/ListFilter.store';
import { ListFilterArgs } from './ListFilter/ListFilter.types';

const useApplyListFilters = () => {
  const closePanel = useStoreActions(({ panel }) => panel.closePanel);
  const setFilter = ListStore.useStoreActions((state) => state.setFilter);

  const filters: ListFilterArgs[] = ListFilterStore.useStoreState((state) => {
    return Object.values(state.filters);
  });

  const applyListFilters = () => {
    const filter = (entity) => {
      return filters.every(({ questionId, value: values }: ListFilterArgs) => {
        const value = entity[questionId];
        return values?.includes(value);
      });
    };

    setFilter({ filter, filterId: 'FILTER_CUSTOM' });
    closePanel();
  };

  return applyListFilters;
};

export default useApplyListFilters;
