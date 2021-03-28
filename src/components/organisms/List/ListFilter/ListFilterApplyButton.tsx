import React from 'react';

import Button from '@atoms/Button/Button';
import useApplyListFilters from '../useApplyListFilters';

const ListFilterApplyButton: React.FC = () => {
  const applyListFilters = useApplyListFilters();

  const onClick = () => {
    return applyListFilters();
  };

  return (
    <Button primary onClick={onClick}>
      Apply Filters
    </Button>
  );
};

export default ListFilterApplyButton;
