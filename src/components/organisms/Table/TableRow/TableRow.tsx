import moment from 'moment-timezone';
import React from 'react';

import Attribute from '@atoms/Tag/Attribute';
import Pill from '@atoms/Tag/Pill';
import { ValueProps } from '@constants';
import { cx, takeFirst } from '@util/util';
import TableStore from '../Table.store';
import { TableColumn, TableRow as TableRowProps } from '../Table.types';
import { getTableCellClass } from '../Table.util';
import SelectRowCheckbox from './TableRowCheckbox';

interface DataCellProps
  extends Pick<TableColumn, 'category' | 'render' | 'type'>,
    TableRowProps,
    ValueProps {
  i: number;
}

const DataCell = ({ category, i, id, render, type, value }: DataCellProps) => {
  const alignEndRight = TableStore.useStoreState(({ columns, options }) => {
    const isLastCell = i === columns.length - 1;
    return options.alignEndRight && isLastCell;
  });

  const hasCheckbox = TableStore.useStoreState(
    ({ options }) => options.hasCheckbox
  );

  const fixFirstColumn = TableStore.useStoreState(
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

const TableRow: React.FC<TableRowProps> = (row) => {
  const onRowClick = TableStore.useStoreState(
    ({ options }) => options.onRowClick
  );

  const columns = TableStore.useStoreState((store) => store.columns);

  const isSelected: boolean = TableStore.useStoreState(({ selectedRowIds }) => {
    return selectedRowIds.includes(row?.id);
  });

  const css = cx('', {
    'o-table-tr--active': isSelected,
    'o-table-tr--clickable': !!onRowClick
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

export default TableRow;
