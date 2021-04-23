import { nanoid } from 'nanoid';
import React from 'react';

import Row from '@components/containers/Row/Row';
import { useTableState } from '../Table.state';
import { TablePaginationValue, TableState } from '../Table.types';
import { getPaginationValues } from '../Table.util';
import TablePaginationBackButton from './TablePaginationBackButton';
import TablePaginationNextButton from './TablePaginationNextButton';
import TablePaginationNumberButton from './TablePaginationNumberButton';

const TablePaginationNumberButtonList: React.FC = () => {
  const { filteredRows, page }: TableState = useTableState();
  const numPages: number = Math.ceil(filteredRows.length / 25);

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
  const { filteredRows, rowsPerPage }: TableState = useTableState();

  if (filteredRows.length < rowsPerPage) return null;

  return (
    <Row>
      <TablePaginationBackButton />
      <TablePaginationNumberButtonList />
      <TablePaginationNextButton />
    </Row>
  );
};

export default TablePaginationButtonList;
