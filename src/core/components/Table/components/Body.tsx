/**
 * @fileoverview Component: Body
 * - Represents the DATA of the table.
 * @author Rami Abdou
 */

import React from 'react';

import { QuestionType, ValueProps } from '@constants';
import { useStoreState } from '@store/Store';
import CSSModifier from '@util/CSSModifier';
import Table from '../Table.store';
import { Row } from '../Table.types';
import SelectOption from './SelectOption';

interface DataCellProps extends ValueProps {
  type: QuestionType;
}

const DataCell = ({ type, value }: DataCellProps) => {
  const primaryColor = useStoreState(
    ({ membership }) => membership.activeMembership?.community?.primaryColor
  );

  const { css } = new CSSModifier()
    .addClass(type === 'MULTIPLE_CHOICE', 'c-table-td--multiple-choice')
    .addClass(type === 'MULTIPLE_SELECT', 'c-table-td--multiple-select');

  const style = { backgroundColor: `${primaryColor}33` };

  let content: React.ReactNode = value;
  if (type === 'MULTIPLE_CHOICE') content = <span style={style}>{value}</span>;
  else if (type === 'MULTIPLE_SELECT')
    content = (
      <>
        {value?.split(',').map((individualValue: string) => (
          <span key={individualValue} style={style}>
            {individualValue}
          </span>
        ))}
      </>
    );

  return <td className={css}>{content}</td>;
};

const DataRow = (row: Row) => {
  const select = Table.useStoreState((store) => store.select);
  const columns = Table.useStoreState((store) => store.columns);

  return (
    <tr>
      {select && <SelectOption id={row.id} />}
      {columns.map(({ id, type }) => (
        <DataCell key={id + row.id} type={type} value={row[id]} />
      ))}
    </tr>
  );
};

export default () => {
  const data = Table.useStoreState((store) => store.data);

  return (
    <tbody>
      {data.map((row: Row) => (
        <DataRow key={row.id} {...row} />
      ))}
    </tbody>
  );
};
