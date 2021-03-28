import React from 'react';

import Row from '@containers/Row/Row';
import TableStore from '../Table.store';
import TablePaginationButtonList from './TablePaginationButtonList';
import TablePaginationMessage from './TablePaginationMessage';
import useUpdateRange from './useUpdateRange';

const TablePagination: React.FC = () => {
  useUpdateRange();

  const hasRows: boolean = TableStore.useStoreState((state) => {
    return !!state.filteredRows?.length;
  });

  return (
    <Row wrap className="mt-sm" gap="sm" justify="sb" show={hasRows}>
      <TablePaginationMessage />
      <TablePaginationButtonList />
    </Row>
  );
};

export default TablePagination;
