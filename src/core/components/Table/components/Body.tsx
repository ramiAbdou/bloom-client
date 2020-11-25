/**
 * @fileoverview Component: Body
 * - Represents the DATA of the table.
 * @author Rami Abdou
 */

import moment from 'moment-timezone';
import React, { ReactNode, useEffect, useState } from 'react';

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
    .addClass(type === 'MULTIPLE_SELECT', 'c-table-td--multiple-select')
    .addClass(['SHORT_TEXT', 'CUSTOM'].includes(type), 'c-table-cell--sm')
    .addClass(
      ['MULTIPLE_CHOICE', 'MULTIPLE_SELECT'].includes(type),
      'c-table-cell--md'
    )
    .addClass(['LONG_TEXT'].includes(type), 'c-table-cell--lg');

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
  const isSelected = Table.useStoreState((state) => state.isSelected(row.id));
  const columns = Table.useStoreState((store) => store.columns);

  const { css } = new CSSModifier().addClass(isSelected, 'c-table-tr--active');

  return (
    <tr className={css}>
      {columns.map(({ category, id, type }, i: number) => {
        const value =
          category === 'JOINED_ON' ? moment(row[id]).format('M/D/YY') : row[id];

        return (
          <DataCell key={id + row.id} type={type} value={value}>
            {!i && <SelectOption id={row.id} />}
          </DataCell>
        );
      })}
    </tr>
  );
};

export default () => {
  const filteredData = Table.useStoreState((store) => store.filteredData);
  // const sortedColumnId = Table.useStoreState((store) => store.sortedColumnId);
  // const sortedColumnDirection = Table.useStoreState(
  //   (store) => store.sortedColumnDirection
  // );
  const floor = Table.useStoreState((store) => store.range[0]);
  const ceiling = Table.useStoreState((store) => store.range[1]);

  // useEffect(() => {
  //   setDataToShow(filteredData);
  // }, [sortedColumnId, sortedColumnDirection]);

  // console.log('table data', tableData);
  // console.log('data to show', dataToShow);

  return (
    <tbody>
      {filteredData.slice(floor, ceiling).map((row: Row) => (
        <DataRow key={row.id} {...row} />
      ))}
    </tbody>
  );
};