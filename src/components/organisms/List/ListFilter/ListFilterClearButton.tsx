import React from 'react';

import Button from '@atoms/Button/Button';
import ListStore from '../List.store';
import ListFilterStore from './ListFilter.store';

const ListFilterClearButton: React.FC = () => {
  const clearFilters = ListFilterStore.useStoreActions((state) => {
    return state.clearFilters;
  });

  const setOpenQuestionId = ListFilterStore.useStoreActions((state) => {
    return state.setOpenQuestionId;
  });

  const setCustomFilters = ListStore.useStoreActions((state) => {
    return state.setCustomFilters;
  });

  const onClick: VoidFunction = () => {
    clearFilters();
    setOpenQuestionId(null);
    setCustomFilters({});
  };

  return (
    <Button tertiary onClick={onClick}>
      Clear Filters
    </Button>
  );
};

export default ListFilterClearButton;
