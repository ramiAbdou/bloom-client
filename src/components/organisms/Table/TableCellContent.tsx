import React from 'react';

import Attribute from '@components/atoms/Tag/Attribute';
import Pill from '@components/atoms/Tag/Pill';
import {
  getColumn,
  useTableState
} from '@components/organisms/Table/Table.tracked';
import { QuestionCategory, QuestionType } from '@util/constants';
import { TableColumn } from './Table.types';

interface TableCellContentProps {
  columnId: string;
  value: boolean | string;
}

const TableCellContent: React.FC<TableCellContentProps> = ({
  columnId,
  value
}) => {
  const state = useTableState();

  const { category, format, render, type }: TableColumn = getColumn(state, {
    columnId
  });

  // Custom rendering for of the cell value.
  if (render) return <>{render(value as string)}</>;

  // If format function is provided, we format the value accordingly.
  const formattedValue = format ? format(value) : value;

  if (
    category === QuestionCategory.DUES_STATUS ||
    type === QuestionType.TRUE_FALSE
  ) {
    return <Pill positive={value === true}>{formattedValue}</Pill>;
  }

  if (type === QuestionType.MULTIPLE_CHOICE) {
    return <Attribute>{formattedValue}</Attribute>;
  }

  if (type === QuestionType.MULTIPLE_SELECT && typeof value === 'string') {
    return (
      <>
        {value.split(',').map((element: string) => (
          <Attribute key={element}>{element}</Attribute>
        ))}
      </>
    );
  }

  return <p>{formattedValue ?? ''}</p>;
};

export default TableCellContent;
