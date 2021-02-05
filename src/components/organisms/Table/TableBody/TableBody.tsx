import moment from 'moment-timezone';
import React from 'react';

import Attribute from '@atoms/Tag/Attribute';
import Pill from '@atoms/Tag/Pill';
import { ValueProps } from '@constants';
import { cx, takeFirst } from '@util/util';
import Table from '../Table.store';
import { TableColumn, TableRow } from '../Table.types';
import { getTableCellClass } from '../Table.util';
import SelectRowCheckbox from './SelectRowCheckbox';

interface DataCellProps
  extends Pick<TableColumn, 'category' | 'render' | 'type'>,
    TableRow,
    ValueProps {
  i: number;
}

const DataCell = ({ category, i, id, render, type, value }: DataCellProps) => {
  const alignEndRight = Table.useStoreState(({ columns, options }) => {
    const isLastCell = i === columns.length - 1;
    return options.alignEndRight && isLastCell;
  });

  const hasCheckbox = Table.useStoreState(({ options }) => options.hasCheckbox);

  const fixFirstColumn = Table.useStoreState(
    ({ options }) => options.fixFirstColumn
  );

  const css = cx(getTableCellClass({ category, type }), {
    'o-table-td--fixed': fixFirstColumn && i === 0,
    'o-table-td--multiple-select': type === 'MULTIPLE_SELECT',
    'o-table-td--right': alignEndRight
  });

  const content: React.ReactNode = takeFirst([
    [!!render, render && render(value)],
    [
      category === 'DUES_STATUS' || type === 'TRUE_FALSE',
      <Pill positive={['Active', 'Yes'].includes(value)} show={!!value}>
        {value}
      </Pill>
    ],
    [type === 'MULTIPLE_CHOICE', <Attribute>{value}</Attribute>],
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

const DataRow = (row: TableRow) => {
  const isClickable = Table.useStoreState(({ options }) => options.isClickable);
  const onRowClick = Table.useStoreState(({ options }) => options.onRowClick);
  const isSelected = Table.useStoreState((state) => state.isSelected(row.id));
  const columns = Table.useStoreState((store) => store.columns);

  const css = cx('', {
    'o-table-tr--active': isSelected,
    'o-table-tr--clickable': isClickable || !!onRowClick
  });

  const onClick = () => onRowClick && onRowClick(row);

  return (
    <tr className={css} onClick={onClick}>
      {columns.map(({ category, id, render, type }, i: number) => {
        const value =
          category === 'JOINED_AT' ? moment(row[id]).format('M/D/YY') : row[id];

        return (
          <DataCell
            key={id + row.id}
            category={category}
            i={i}
            id={row.id}
            render={render}
            type={type}
            value={value}
          />
        );
      })}
    </tr>
  );
};

export default DataRow;
