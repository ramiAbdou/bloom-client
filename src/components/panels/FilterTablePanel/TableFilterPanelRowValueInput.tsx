import React from 'react';

import Input from '@components/atoms/Input/Input';
import Dropdown from '@components/molecules/Dropdown/Dropdown';
import {
  useTable,
  useTableColumn,
  useTableFilter
} from '@components/organisms/Table/Table.state';
import { TableColumn } from '@components/organisms/Table/Table.types';
import { useId } from '@core/state/Id.state';
import { QuestionType } from '@util/constants';
import { TableFilter } from './TableFilterPanel.types';

const TableFilterPanelRowValueInput: React.FC = () => {
  const [_, tableDispatch] = useTable();

  const filterId: string = useId();
  const filter: TableFilter = useTableFilter(filterId);
  const column: TableColumn = useTableColumn({ columnId: filter.columnId });

  const onInputChange = (value: string): void => {
    tableDispatch({ filterId, type: 'SET_FILTER', updatedFilter: { value } });
  };

  if (
    column.type === QuestionType.MULTIPLE_CHOICE ||
    column.type === QuestionType.MULTIPLE_SELECT
  ) {
    return (
      <Dropdown
        options={{ attribute: false }}
        selectedValues={[
          column.options?.find((option: string) => option === filter?.value)
        ]}
        values={column.options}
        onSelect={onInputChange}
      />
    );
  }

  return (
    <Input
      placeholder="Value..."
      value={filter?.value}
      onChange={onInputChange}
    />
  );
};

export default TableFilterPanelRowValueInput;
