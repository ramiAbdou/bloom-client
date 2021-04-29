import React from 'react';
import { IoTrash } from 'react-icons/io5';

import Button from '@components/atoms/Button/Button';
import { useId } from '@core/state/Id.state';
import { useTable, useTableSelector } from './Table.state';
import { TableState } from './Table.types';

const TableFilterPanelRowDeleteButton: React.FC = () => {
  const [_, tableDispatch] = useTable();

  const filterId: string = useId();

  const filterCount: number = useTableSelector(
    (state: TableState) => state.allFilterIds.length
  );

  if (filterCount < 2) return null;

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
