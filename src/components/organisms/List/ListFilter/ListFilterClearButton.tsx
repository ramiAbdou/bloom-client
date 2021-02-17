import React from 'react';

import Button from '@atoms/Button/Button';
import ListStore from '../List.store';
import ListFilterStore from './ListFilter.store';

const ListFilterClearButton: React.FC = () => {
  const clearFilters = ListFilterStore.useStoreActions(
    (store) => store.clearFilters
  );

  const setOpenQuestionId = ListFilterStore.useStoreActions(
    (store) => store.setOpenQuestionId
  );

  const removeFilter = ListStore.useStoreActions((store) => store.removeFilter);

  const onClick: VoidFunction = () => {
    clearFilters();
    setOpenQuestionId(null);
    removeFilter('FILTER_CUSTOM');
  };

  return (
    <Button tertiary onClick={onClick}>
      Clear Filters
    </Button>
  );
};

export default ListFilterClearButton;
