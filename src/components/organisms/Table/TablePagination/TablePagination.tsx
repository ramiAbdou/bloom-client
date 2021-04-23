import React from 'react';

import Row from '@components/containers/Row/Row';
import { useTableState } from '../Table.state';
import { TableState } from '../Table.types';
import TablePaginationButtonList from './TablePaginationButtonList';
import TablePaginationMessage from './TablePaginationMessage';

const TablePagination: React.FC = () => {
  const { filteredRows }: TableState = useTableState();

  if (!filteredRows?.length) return null;

  return (
    <Row wrap className="mt-sm" gap="sm" justify="sb">
      <TablePaginationMessage />
      <TablePaginationButtonList />
    </Row>
  );
};

export default TablePagination;
