/**
 * @fileoverview Component: Row
 * @author Rami Abdou
 */

import React from 'react';
import { Cell as CellProps, Row as RowProps } from 'react-table';

import { useStoreState } from '@store/Store';
import CSSModifier from '@util/CSSModifier';

const DataCell = (cell: CellProps) => {
  const primaryColor = useStoreState(
    ({ membership }) => membership.activeMembership?.community?.primaryColor
  );

  const { column, value } = cell;

  // @ts-ignore b/c precondition is that a type exists!
  const { id, type } = column;

  const { css } = new CSSModifier()
    .addClass(id === 'SELECTOR', 'c-table-selector')
    .addClass(type === 'MULTIPLE_CHOICE', 'c-table-td--multiple-choice')
    .addClass(type === 'MULTIPLE_SELECT', 'c-table-td--multiple-select');

  const style = { backgroundColor: `${primaryColor}33` };

  let content: React.ReactNode;
  if (type === 'MULTIPLE_CHOICE')
    content = <span style={style}>{cell.render('Cell')}</span>;
  else if (type === 'MULTIPLE_SELECT')
    content = (
      <>
        {value?.split(',').map((val) => (
          <span key={val} style={style}>
            {val}
          </span>
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

export default (row: RowProps) => (
  <tr>
    {row.cells.map((cell) => (
      <DataCell key={cell.column.id} {...cell} />
    ))}
  </tr>
);
