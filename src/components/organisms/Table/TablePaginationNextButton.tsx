import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';

import Button from '@components/atoms/Button/Button';
import { useTableDispatch, useTableState } from './Table.state';
import { TableDispatch, TableState } from './Table.types';

const TablePaginationNextButton: React.FC = () => {
  const { page, rowsPerPage, totalCount }: TableState = useTableState();
  const tableDispatch: TableDispatch = useTableDispatch();

  const pagesCount: number = Math.ceil(totalCount / rowsPerPage);

  const onClick = (): void => {
    if (page < pagesCount - 1) {
      tableDispatch({ page: page + 1, type: 'SET_PAGE' });
    }
  };

  return (
    <Button className="o-table-pagination-chevron" onClick={onClick}>
      <IoChevronForwardOutline />
    </Button>
  );
};

export default TablePaginationNextButton;
