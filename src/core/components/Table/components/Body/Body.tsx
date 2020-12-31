import moment from 'moment-timezone';
import React from 'react';

import Attribute from '@components/Tags/Attribute';
import { QuestionType, ValueProps } from '@constants';
import { makeClass, takeFirst } from '@util/util';
import Table from '../../Table.store';
import { Row } from '../../Table.types';
import { getTableCellClass } from '../../Table.util';
import SelectRowCheckbox from './SelectRowCheckbox';

interface DataCellProps extends Row, ValueProps {
  i: number;
  type: QuestionType;
}

const DataCell = ({ i, id, type, value }: DataCellProps) => {
  const hasCheckbox = Table.useStoreState(({ options }) => options.hasCheckbox);

  const fixFirstColumn = Table.useStoreState(
    ({ options }) => options.fixFirstColumn
  );

  const css = makeClass([
    getTableCellClass(type),
    [type === 'MULTIPLE_SELECT', 'c-table-td--multiple-select'],
    [fixFirstColumn && i === 0, 'c-table-td--fixed']
  ]);

  const content: React.ReactNode = takeFirst([
    [type === 'MULTIPLE_CHOICE' && value, <Attribute value={value} />],
    [
      type === 'MULTIPLE_SELECT',
      <>
        {typeof value === 'string' &&
          value
            .split(',')
            .map((val: string) => <Attribute key={val} value={val} />)}
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

  const css = makeClass([
    [isSelected, 'c-table-tr--active'],
    [isClickable, 'c-table-tr--clickable']
  ]);

  return (
    <tr className={css}>
      {columns.map(({ category, id, type }, i: number) => {
        const value =
          category === 'JOINED_ON' ? moment(row[id]).format('M/D/YY') : row[id];

        return (
          <DataCell
            key={id + row.id}
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
