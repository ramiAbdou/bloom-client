import React from 'react';

import Dropdown from '@components/molecules/Dropdown/Dropdown';
import IdStore from '@core/store/Id.store';
import { useTableDispatch, useTableState } from './Table.state';
import { TableDispatch, TableState } from './Table.types';
import { TableFilterOperatorType } from './TableFilterPanel.types';

const TableFilterPanelRowOperatorDropdown: React.FC = () => {
  const { filters }: TableState = useTableState();
  const tableDispatch: TableDispatch = useTableDispatch();
  const filterId: string = IdStore.useStoreState((state) => state.id);
  const operator: TableFilterOperatorType = filters[filterId]?.operator;

  const onSelect = (result: TableFilterOperatorType) => {
    tableDispatch({
      filterId,
      type: 'SET_FILTER',
      updatedFilter: { operator: result }
    });
  };

  return (
    <Dropdown
      options={{ attribute: false }}
      value={operator}
      values={[
        TableFilterOperatorType.IS,
        TableFilterOperatorType.IS_NOT,
        TableFilterOperatorType.INCLUDES
      ]}
      onSelect={onSelect}
    />
  );
};

export default TableFilterPanelRowOperatorDropdown;
