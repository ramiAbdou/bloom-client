import React from 'react';
import { IoTrash } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import IdStore from '@store/Id.store';
import TableFilterStore from './TableFilter.store';

const TableFilterRowDeleteButton: React.FC = () => {
  const id: string = IdStore.useStoreState((state) => state.id);

  const show: boolean = TableFilterStore.useStoreState((state) => {
    return state.filterIds?.length >= 2;
  });

  const removeFilter = TableFilterStore.useStoreActions(
    (store) => store.removeFilter
  );

  const onClick = () => removeFilter(id);

  return (
    <Button show={show} onClick={onClick}>
      <IoTrash />
    </Button>
  );
};

export default TableFilterRowDeleteButton;
