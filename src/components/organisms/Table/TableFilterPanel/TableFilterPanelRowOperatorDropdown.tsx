import React from 'react';

import Dropdown from '@components/molecules/Dropdown/Dropdown';
import IdStore from '@core/store/Id.store';
import TableFilterStore from './TableFilterPanel.store';
import { TableFilterOperatorType } from './TableFilterPanel.types';

const TableFilterPanelRowOperatorDropdown: React.FC = () => {
  const id: string = IdStore.useStoreState((state) => state.id);

  const operator: TableFilterOperatorType = TableFilterStore.useStoreState(
    (state) => state.filters[id]?.operator
  );

  const setFilter = TableFilterStore.useStoreActions(
    (state) => state.setFilter
  );

  const onOperatorUpdate = (result: TableFilterOperatorType) => {
    setFilter({ id, operator: result });
  };

  return (
    <Dropdown
      options={{ attribute: false }}
      value={operator}
      values={['includes', 'is', 'is not']}
      onSelect={onOperatorUpdate}
    />
  );
};

export default TableFilterPanelRowOperatorDropdown;
