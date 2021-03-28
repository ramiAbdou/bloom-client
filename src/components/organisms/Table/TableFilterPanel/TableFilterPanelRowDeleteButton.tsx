import React from 'react';
import { IoTrash } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import IdStore from '@store/Id.store';
import TableFilterStore from './TableFilterPanel.store';

const TableFilterPanelRowDeleteButton: React.FC = () => {
  const id: string = IdStore.useStoreState((state) => {
    return state.id;
  });

  const show: boolean = TableFilterStore.useStoreState((state) => {
    return state.filterIds?.length >= 2;
  });

  const removeFilter = TableFilterStore.useStoreActions((state) => {
    return state.removeFilter;
  });

  const onClick = () => {
    return removeFilter(id);
  };

  return (
    <Button show={show} onClick={onClick}>
      <IoTrash />
    </Button>
  );
};

export default TableFilterPanelRowDeleteButton;
