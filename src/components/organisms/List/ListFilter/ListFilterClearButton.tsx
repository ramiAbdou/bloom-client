import React from 'react';

import Button from '@components/atoms/Button/Button';
import ListStore from '../List.store';
import ListFilterStore from './ListFilter.store';

const ListFilterClearButton: React.FC = () => {
  const clearFilters = ListFilterStore.useStoreActions(
    (state) => state.clearFilters
  );

  const setOpenQuestionId = ListFilterStore.useStoreActions(
    (state) => state.setOpenQuestionId
  );

  const setCustomFilters = ListStore.useStoreActions(
    (state) => state.setCustomFilters
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
