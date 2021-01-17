import moment from 'moment-timezone';
import React from 'react';

import { Attribute } from '@atoms/Tags';
import { QuestionType, ValueProps } from '@constants';
import { cx, takeFirst } from '@util/util';
import Table from '../Table.store';
import { Row } from '../Table.types';
import { getTableCellClass } from '../Table.util';
import SelectRowCheckbox from './SelectRowCheckbox';

interface DataCellProps extends Row, ValueProps {
  i: number;
  type: QuestionType;
}

const DataCell = ({ category, i, id, type, value }: DataCellProps) => {
  const alignEndRight = Table.useStoreState(({ columns, options }) => {
    const isLastCell = i === columns.length - 1;
    return options.alignEndRight && isLastCell;
  });

  const hasCheckbox = Table.useStoreState(({ options }) => options.hasCheckbox);

  const fixFirstColumn = Table.useStoreState(
    ({ options }) => options.fixFirstColumn
  );

  const css = cx(getTableCellClass({ category, type }), {
    'c-table-td--fixed': fixFirstColumn && i === 0,
    'c-table-td--multiple-select': type === 'MULTIPLE_SELECT',
    'c-table-td--right': alignEndRight
  });

  const content: React.ReactNode = takeFirst([
    [
      type === 'MULTIPLE_CHOICE' && typeof value === 'string',
      <Attribute>{value}</Attribute>
    ],
    [type === 'MULTIPLE_CHOICE', value],
    [
      type === 'MULTIPLE_SELECT',
      <>
        {typeof value === 'string' &&
          value
            .split(',')
            .map((val: string) => <Attribute key={val}>{val}</Attribute>)}
      </>
    ],
    [type === 'CUSTOM', value],
    <p>{value}</p>
  ]);

  return (
    <td className={css}>
      <div>
        {!i && hasCheckbox && <SelectRowCheckbox id={id} />}
        {content}
      </div>
    </td>
  );
};

const DataRow = (row: Row) => {
  const isClickable = Table.useStoreState(({ options }) => options.isClickable);
  const isSelected = Table.useStoreState((state) => state.isSelected(row.id));
  const columns = Table.useStoreState((store) => store.columns);

  const css = cx('', {
    'c-table-tr--active': isSelected,
    'c-table-tr--clickable': isClickable
  });

  return (
    <tr className={css}>
      {columns.map(({ category, id, type }, i: number) => {
        const value =
          category === 'JOINED_AT' ? moment(row[id]).format('M/D/YY') : row[id];

        return (
          <DataCell
            key={id + row.id}
            category={category}
            i={i}
            id={row.id}
            type={type}
            value={value}
          />
        );
      })}
    </tr>
  );
};

export default DataRow;
