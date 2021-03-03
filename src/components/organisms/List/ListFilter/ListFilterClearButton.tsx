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

  const setCustomFilters = ListStore.useStoreActions(
    (store) => store.setCustomFilters
  );

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
