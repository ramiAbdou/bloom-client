import moment from 'moment-timezone';
import React, { ReactNode } from 'react';

import Checkbox from '@components/Elements/Checkbox/Checkbox';
import Attribute from '@components/Tags/Attribute';
import { IdProps, QuestionType, ValueProps } from '@constants';
import { makeClass, takeFirst } from '@util/util';
import Table from '../Table.store';
import { Row } from '../Table.types';

const SelectRowCheckbox = ({ id }: IdProps) => {
  const isSelected = Table.useStoreState((state) => state.isSelected(id));
  const toggleRow = Table.useStoreActions((store) => store.toggleRow);

  const onChange = () => toggleRow(id);

  return (
    <Checkbox
      checked={isSelected}
      className="c-table-select"
      onChange={onChange}
    />
  );
};

interface DataCellProps extends Row, ValueProps {
  i: number;
  type: QuestionType;
}

const DataCell = ({ i, id, type, value }: DataCellProps) => {
  const hasCheckbox = Table.useStoreState(({ options }) => options.hasCheckbox);

  const css = makeClass([
    [!type || ['SHORT_TEXT', 'CUSTOM'].includes(type), 'c-table-cell--sm'],
    [['MULTIPLE_CHOICE', 'MULTIPLE_SELECT'].includes(type), 'c-table-cell--md'],
    [['LONG_TEXT'].includes(type), 'c-table-cell--lg'],
    [type === 'MULTIPLE_SELECT', 'c-table-td--multiple-select']
  ]);

  const content: ReactNode = takeFirst([
    [type === 'MULTIPLE_CHOICE' && value, <Attribute value={value} />],
    [
      type === 'MULTIPLE_SELECT',
      <>
        {value?.split(',').map((val: string) => (
          <Attribute key={val} value={val} />
        ))}
      </>
    ],
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
  const isSelected = Table.useStoreState((state) => state.isSelected(row.id));
  const columns = Table.useStoreState((store) => store.columns);

  const css = makeClass([isSelected, 'c-table-tr--active']);

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
