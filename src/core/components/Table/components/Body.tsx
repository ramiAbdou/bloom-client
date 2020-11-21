/**
 * @fileoverview Component: Body
 * - Represents the DATA of the table.
 * @author Rami Abdou
 */

import React, { ReactNode } from 'react';

import Tag from '@components/Misc/Tag';
import { ChildrenProps, QuestionType, ValueProps } from '@constants';
import CSSModifier from '@util/CSSModifier';
import Table from '../Table.store';
import { Row } from '../Table.types';
import SelectOption from './SelectOption';

interface DataCellProps extends Partial<ChildrenProps>, ValueProps {
  type: QuestionType;
}

const DataCell = ({ children, type, value }: DataCellProps) => {
  const { css } = new CSSModifier()
    .addClass(type === 'MULTIPLE_CHOICE', 'c-table-td--multiple-choice')
    .addClass(type === 'MULTIPLE_SELECT', 'c-table-td--multiple-select');

  let content: ReactNode = value;
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
  const columns = Table.useStoreState((store) => store.columns);

  return (
    <tr>
      {columns.map(({ id, type }, i: number) => (
        <DataCell key={id + row.id} type={type} value={row[id]}>
          {!i && <SelectOption id={row.id} />}
        </DataCell>
      ))}
    </tr>
  );
};

export default () => {
  const data = Table.useStoreState((store) => store.filteredData);

  return (
    <tbody>
      {data.slice(0, 100).map((row: Row) => (
        <DataRow key={row.id} {...row} />
      ))}
    </tbody>
  );
};
