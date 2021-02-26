import deepequal from 'fast-deep-equal';
import React from 'react';

import Attribute from '@atoms/Tag/Attribute';
import Pill from '@atoms/Tag/Pill';
import Row from '@containers/Row/Row';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import { QuestionCategory, QuestionType, ValueProps } from '@util/constants';
import { cx } from '@util/util';
import TableStore from '../Table.store';
import { TableColumn } from '../Table.types';
import { getTableCellClass } from '../Table.util';
import SelectRowCheckbox from './TableRowCheckbox';

interface TableRowCellProps extends ValueProps {
  columnId: string;
  rowId: string;
}

const TableRowCellContent: React.FC<
  Pick<TableRowCellProps, 'columnId' | 'value'>
> = ({ columnId, value }) => {
  const columnIndex: number = TableStore.useStoreState(({ columns }) => {
    return columns.findIndex((element: TableColumn) => element.id === columnId);
  });

  const column: TableColumn = TableStore.useStoreState(({ columns }) => {
    return columns[columnIndex];
  }, deepequal);

  const { category, format, render, type } = column ?? {};

  if (render) return <>{render(value)}</>;

  const formattedValue = format ? format(value) : value;

  if (
    category === QuestionCategory.DUES_STATUS ||
    type === QuestionType.TRUE_FALSE
  ) {
    return (
      <Pill positive={['Active', 'Yes', true].includes(value)} show={!!value}>
        {formattedValue}
      </Pill>
    );
  }

  if (category === QuestionCategory.PROFILE_PICTURE) {
    return <ProfilePicture size={24} />;
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

  return <p>{formattedValue}</p>;
};

const TableRowCell: React.FC<TableRowCellProps> = (props) => {
  const { columnId } = props;

  const columnIndex: number = TableStore.useStoreState(({ columns }) => {
    return columns.findIndex((element: TableColumn) => element.id === columnId);
  });

  const column: TableColumn = TableStore.useStoreState(({ columns }) => {
    return columns[columnIndex];
  }, deepequal);

  const { category, type } = column ?? {};

  const alignEndRight = TableStore.useStoreState(({ columns, options }) => {
    const isLastCell = columnIndex === columns.length - 1;
    return options.alignEndRight && isLastCell;
  });

  const fixFirstColumn = TableStore.useStoreState(
    ({ options }) => options.fixFirstColumn
  );

  const css = cx(getTableCellClass({ category, type }), {
    'o-table-td--fixed': fixFirstColumn && columnIndex === 0,
    'o-table-td--multiple-select': type === 'MULTIPLE_SELECT',
    'o-table-td--right': alignEndRight
  });

  return (
    <td className={css}>
      <div>
        <SelectRowCheckbox {...props} />
        <TableRowCellContent {...props} />
      </div>
    </td>
  );
};

export default TableRowCell;
