import React from 'react';
import { IoTrash } from 'react-icons/io5';

import Button from '@components/atoms/Button/Button';
import IdStore from '@core/store/Id.store';
import TableFilterStore from './TableFilterPanel.store';

const TableFilterPanelRowDeleteButton: React.FC = () => {
  const filterId: string = IdStore.useStoreState((state) => state.id);

  const show: boolean = TableFilterStore.useStoreState(
    (state) => state.filterIds?.length >= 2
  );

  const removeFilter = TableFilterStore.useStoreActions(
    (state) => state.removeFilter
  );

  const onClick = (): void => {
    removeFilter(filterId);
  };

  return (
    <Button show={show} onClick={onClick}>
      <IoTrash />
    </Button>
  );
};

export default TableFilterPanelRowDeleteButton;
