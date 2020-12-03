import moment from 'moment-timezone';
import React, { ReactNode } from 'react';

import Tag from '@components/Misc/Tag';
import { ChildrenProps, QuestionType, ValueProps } from '@constants';
import { makeClass } from '@util/util';
import Table from '../Table.store';
import { Row } from '../Table.types';
import SelectOption from './SelectOption';

interface DataCellProps extends Partial<ChildrenProps>, ValueProps {
  type: QuestionType;
}

const DataCell = ({ children, type, value }: DataCellProps) => {
  const css = makeClass([
    [type === 'MULTIPLE_CHOICE', 'c-table-td--multiple-choice'],
    [type === 'MULTIPLE_SELECT', 'c-table-td--multiple-select'],
    [['SHORT_TEXT', 'CUSTOM'].includes(type), 'c-table-cell--sm'],
    [['MULTIPLE_CHOICE', 'MULTIPLE_SELECT'].includes(type), 'c-table-cell--md'],
    [['LONG_TEXT'].includes(type), 'c-table-cell--lg']
  ]);

  let content: ReactNode = <p>{value}</p>;
  if (type === 'MULTIPLE_CHOICE' && value) content = <Tag value={value} />;
  else if (type === 'MULTIPLE_SELECT')
    content = (
      <>
        {value?.split(',').map((individualValue: string) => (
          <Tag key={individualValue} value={individualValue} />
        ))}
      </>
    );

  return (
    <td className={css}>
      <div>
        {children}
        {content}
      </div>
    </td>
  );
};

const DataRow = (row: Row) => {
  const isSelected = Table.useStoreState((state) => state.isSelected(row.id));
  const columns = Table.useStoreState((store) => store.columns);
  const select = Table.useStoreState((store) => store.select);

  const css = makeClass([isSelected, 'c-table-tr--active']);

  return (
    <tr className={css}>
      {columns.map(({ category, id, type }, i: number) => {
        const value =
          category === 'JOINED_ON' ? moment(row[id]).format('M/D/YY') : row[id];

        return (
          <DataCell key={id + row.id} type={type} value={value}>
            {!i && select && <SelectOption id={row.id} />}
          </DataCell>
        );
      })}
    </tr>
  );
};

export default () => {
  const filteredData = Table.useStoreState((store) => store.filteredData);
  const floor = Table.useStoreState((store) => store.range[0]);
  const ceiling = Table.useStoreState((store) => store.range[1]);

  // Fetching these values forces React to re-render, which in the case of
  // sorting, we do want to re-render our data.
  Table.useStoreState((store) => store.sortedColumnId);
  Table.useStoreState((store) => store.sortedColumnDirection);

  return (
    <tbody>
      {filteredData.slice(floor, ceiling).map((row: Row) => (
        <DataRow key={row.id} {...row} />
      ))}
    </tbody>
  );
};
