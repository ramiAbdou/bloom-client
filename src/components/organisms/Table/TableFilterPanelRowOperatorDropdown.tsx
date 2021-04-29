import React from 'react';

import Dropdown from '@components/molecules/Dropdown/Dropdown';
import { useId } from '@core/state/Id.state';
import { useTable, useTableFilter } from './Table.state';
import { TableFilter } from './Table.types';
import { TableFilterOperatorType } from './TableFilterPanel.types';

const TableFilterPanelRowOperatorDropdown: React.FC = () => {
  const [_, tableDispatch] = useTable();

  const filterId: string = useId();
  const filter: TableFilter = useTableFilter(filterId);

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
      selectedValues={[filter.operator]}
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
