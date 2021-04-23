import React from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';

import Button from '@components/atoms/Button/Button';
import { useTableDispatch, useTableState } from '../Table.state';
import { TableDispatch, TableState } from '../Table.types';

const TablePaginationBackButton: React.FC = () => {
  const { page }: TableState = useTableState();
  const tableDispatch: TableDispatch = useTableDispatch();

  const onClick = (): void => {
    if (page > 0) tableDispatch({ page: page - 1, type: 'SET_PAGE' });
  };

  return (
    <Button className="o-table-pagination-chevron" onClick={onClick}>
      <IoChevronBackOutline />
    </Button>
  );
};

export default TablePaginationBackButton;
