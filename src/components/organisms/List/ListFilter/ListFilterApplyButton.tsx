import React from 'react';

import Button from '@components/atoms/Button/Button';
import useApplyListFilters from '../useApplyListFilters';

const ListFilterApplyButton: React.FC = () => {
  const applyListFilters = useApplyListFilters();
  const onClick = () => applyListFilters();

  return (
    <Button primary onClick={onClick}>
      Apply Filters
    </Button>
  );
};

export default ListFilterApplyButton;
