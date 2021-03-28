import React from 'react';

import Attribute from '@atoms/Tag/Attribute';
import Pill from '@atoms/Tag/Pill';
import { QuestionCategory, QuestionType } from '@util/constants';
import TableStore from './Table.store';
import { TableColumn } from './Table.types';

interface TableCellContentProps {
  columnId: string;
  value: boolean | string;
}

const TableCellContent: React.FC<TableCellContentProps> = ({
  columnId,
  value
}) => {
  const columnIndex: number = TableStore.useStoreState(({ columns }) => {
    return columns.findIndex((element: TableColumn) => {
      return element.id === columnId;
    });
  });

  const {
    category,
    format,
    render,
    type
  }: TableColumn = TableStore.useStoreState(({ columns }) => {
    return (columns[columnIndex] ?? {}) as TableColumn;
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
        {value.split(',').map((element: string) => {
          return <Attribute key={element}>{element}</Attribute>;
        })}
      </>
    );
  }

  return <p>{formattedValue ?? ''}</p>;
};

export default TableCellContent;
