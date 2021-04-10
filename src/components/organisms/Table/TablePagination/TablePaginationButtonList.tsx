import { nanoid } from 'nanoid';
import React from 'react';

import Row from '@components/containers/Row/Row';
import TableStore from '../Table.store';
import { getPaginationValues } from '../Table.util';
import TablePaginationStore from './TablePagination.store';
import { TablePaginationValue } from './TablePagination.types';
import TablePaginationBackButton from './TablePaginationBackButton';
import TablePaginationNextButton from './TablePaginationNextButton';
import TablePaginationNumberButton from './TablePaginationNumberButton';

const TablePaginationNumberButtonList: React.FC = () => {
  const page: number = TablePaginationStore.useStoreState(
    (state) => state.page
  );

  const paginationValues: TablePaginationValue[] = TableStore.useStoreState(
    (state) => {
      const numPages: number = Math.ceil(state.filteredRows.length / 25);
      return getPaginationValues(Array.from(Array(numPages).keys()), page);
    }
  );

  return (
    <>
      {paginationValues.map((paginationValue: TablePaginationValue) => (
        <TablePaginationNumberButton key={nanoid()} value={paginationValue} />
      ))}
    </>
  );
};

const TablePaginationButtonList: React.FC = () => {
  const rowsCount: number = TableStore.useStoreState(
    (state) => state.filteredRows?.length
  );

  return (
    <Row show={rowsCount >= 25}>
      <TablePaginationBackButton />
      <TablePaginationNumberButtonList />
      <TablePaginationNextButton />
    </Row>
  );
};

export default TablePaginationButtonList;
