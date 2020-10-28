/**
 * @fileoverview Component: Table
 * @author Rami Abdou
 */

import './Table.scss';

import React from 'react';
import { Cell, Row as RowProps, TableOptions, useTable } from 'react-table';

import { ClassNameProps } from '@constants';
import CSSModifier from '@util/CSSModifier';

interface TableProps extends TableOptions<{}>, ClassNameProps {}

const BodyCell = (cell: Cell) => {
  const { column, value } = cell;

  // @ts-ignore b/c precondition is that a type exists!
  const { type } = column;

  const { css } = new CSSModifier()
    .addClass(type === 'MULTIPLE_CHOICE', 'c-table-td--multiple-choice')
    .addClass(type === 'MULTIPLE_SELECT', 'c-table-td--multiple-select');

  let content;
  if (type === 'MULTIPLE_CHOICE') content = <span>{cell.render('Cell')}</span>;
  else if (type === 'MULTIPLE_SELECT')
    content = (
      <>
        {value?.split(',').map((val) => (
          <span>{val}</span>
        ))}
      </>
    );
  else content = cell.render('Cell');

  return (
    <td className={css} {...cell.getCellProps()}>
      {content}
    </td>
  );
};

const Row = (row: RowProps) => {
  return (
    <tr {...row.getRowProps()}>
      {row.cells.map((cell) => (
        <BodyCell {...cell} />
      ))}
    </tr>
  );
};

export default ({ className, ...options }: TableProps) => {
  const table = useTable(options);

  const { css } = new CSSModifier()
    .class('c-table')
    .addClass(!!className, className);

  return (
    <div className="c-table-ctr">
      <table className={css} {...table.getTableProps()}>
        <thead>
          {table.headerGroups.map((group) => (
            <tr {...group.getHeaderGroupProps()}>
              {group.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...table.getTableBodyProps()}>
          {table.rows.map((row) => {
            table.prepareRow(row);
            return <Row {...row} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
