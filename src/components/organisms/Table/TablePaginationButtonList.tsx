import { nanoid } from 'nanoid';
import React from 'react';

import Row from '@components/containers/Row/Row';
import { useTableState } from './Table.state';
import { TablePaginationValue, TableState } from './Table.types';
import { getPaginationValues } from './Table.util';
import TablePaginationBackButton from './TablePaginationBackButton';
import TablePaginationNextButton from './TablePaginationNextButton';
import TablePaginationNumberButton from './TablePaginationNumberButton';

const TablePaginationNumberButtonList: React.FC = () => {
  const { page, rowsPerPage, totalCount }: TableState = useTableState();
  const numPages: number = Math.ceil(totalCount / rowsPerPage);

  const paginationValues: TablePaginationValue[] = getPaginationValues(
    Array.from(Array(numPages).keys()),
    page
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
  const { filteredRows, rowsPerPage, totalCount }: TableState = useTableState();

  console.log('totalCount', totalCount, filteredRows.length);

  if (totalCount < rowsPerPage) return null;

  return (
    <Row>
      <TablePaginationBackButton />
      <TablePaginationNumberButtonList />
      <TablePaginationNextButton />
    </Row>
  );
};

export default TablePaginationButtonList;
