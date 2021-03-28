import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Button from '@atoms/Button/Button';
import TableFilterPanelStore from './TableFilterPanel.store';

const TableFilterPanelAddButton: React.FC = () => {
  const addEmptyFilter: ActionCreator<void> = TableFilterPanelStore.useStoreActions(
    (store) => {
      return store.addEmptyFilter;
    }
  );

  const onClick = (): void => {
    addEmptyFilter();
  };

  return (
    <Button tertiary className="mb-sm--nlc" onClick={onClick}>
      + Add Filter
    </Button>
  );
};

export default TableFilterPanelAddButton;
