import React from 'react';
import { IoTrash } from 'react-icons/io5';

import Button from '@components/atoms/Button/Button';
import IdStore from '@core/store/Id.store';
import { useTableDispatch, useTableState } from './Table.state';
import { TableDispatch, TableState } from './Table.types';

const TableFilterPanelRowDeleteButton: React.FC = () => {
  const tableDispatch: TableDispatch = useTableDispatch();
  const { allFilterIds }: TableState = useTableState();
  const filterId: string = IdStore.useStoreState((state) => state.id);

  if (allFilterIds.length < 2) return null;

  const onClick = (): void => {
    tableDispatch({ filterId, type: 'REMOVE_FILTER' });
  };

  return (
    <Button onClick={onClick}>
      <IoTrash />
    </Button>
  );
};

export default TableFilterPanelRowDeleteButton;
