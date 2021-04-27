import React from 'react';

import Row from '@components/containers/Row/Row';
import { useIsTablePopulated } from './Table.state';
import TablePaginationButtonList from './TablePaginationButtonList';
import TablePaginationMessage from './TablePaginationMessage';

const TablePagination: React.FC = () => {
  const isTablePopulated: boolean = useIsTablePopulated();
  if (!isTablePopulated) return null;

  return (
    <Row wrap className="mt-sm" gap="sm" justify="sb">
      <TablePaginationMessage />
      <TablePaginationButtonList />
    </Row>
  );
};

export default TablePagination;
