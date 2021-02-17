import React from 'react';

import Button from '@atoms/Button/Button';
import { useStoreActions } from '@store/Store';
import ListStore from '../List.store';
import ListFilterStore from './ListFilter.store';
import { ListFilterArgs } from './ListFilter.types';

const ListFilterApplyButton: React.FC = () => {
  const closePanel = useStoreActions(({ panel }) => panel.closePanel);

  const filters: ListFilterArgs[] = ListFilterStore.useStoreState((state) => {
    return Object.values(state.filters);
  });

  const setFilter = ListStore.useStoreActions((state) => state.setFilter);

  const onClick = () => {
    const filter = (entity) => {
      return filters.every(({ questionId, value: values }: ListFilterArgs) => {
        const value = entity[questionId];
        return values?.includes(value);
      });
    };

    setFilter({ filter, filterId: 'FILTER_CUSTOM' });
    closePanel();
  };

  return (
    <Button primary onClick={onClick}>
      Apply Filters
    </Button>
  );
};

export default ListFilterApplyButton;
