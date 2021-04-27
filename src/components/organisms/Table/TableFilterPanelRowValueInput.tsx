import React from 'react';

import Input from '@components/atoms/Input/Input';
import Dropdown from '@components/molecules/Dropdown/Dropdown';
import IdStore from '@core/store/Id.store';
import { QuestionType } from '@util/constants';
import { useTable, useTableColumn } from './Table.state';
import { TableColumn } from './Table.types';
import { TableFilter } from './TableFilterPanel.types';

const TableFilterPanelRowValueInput: React.FC = () => {
  const [{ filters }, tableDispatch] = useTable();

  const filterId: string = IdStore.useStoreState((state) => state.id);
  const filter: TableFilter = filters[filterId];

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
        value={column.options?.find(
          (option: string) => option === filter?.value
        )}
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
