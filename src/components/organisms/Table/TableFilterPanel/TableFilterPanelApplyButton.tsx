import React from 'react';

import Button from '@atoms/Button/Button';
import { useStoreActions } from '@store/Store';
import TableStore from '../Table.store';
import { TableRow } from '../Table.types';
import TableFilterPanelStore from './TableFilterPanel.store';
import { TableFilterArgs, TableFilterFunction } from './TableFilterPanel.types';

interface ProcessFilterArgs extends TableFilterArgs {
  row: TableRow;
}

const processFilter = (args: ProcessFilterArgs) => {
  const { columnId, operator, row, value } = args;

  const rowValue: any = row[columnId]?.toString()?.toLowerCase();
  const processedValue: string = value?.toString()?.toLowerCase();

  if (operator === 'includes') return rowValue?.includes(processedValue);
  if (operator === 'is') return rowValue === processedValue;
  if (operator === 'is not') return rowValue !== processedValue;
  return false;
};

const TableFilterPanelApplyButton: React.FC = () => {
  const closePanel = useStoreActions(({ panel }) => {
    return panel.closePanel;
  });

  const joinOperator = TableFilterPanelStore.useStoreState((store) => {
    return store.joinOperator;
  });

  const filters: TableFilterArgs[] = TableFilterPanelStore.useStoreState(
    (store) => {
      return Object.values(store.filters);
    }
  );

  const setFilter = TableStore.useStoreActions((store) => {
    return store.setFilter;
  });

  const onClick = () => {
    const filter: TableFilterFunction = (row: TableRow) => {
      if (joinOperator === 'and') {
        return filters?.every((filterArgs: TableFilterArgs) => {
          return processFilter({ ...filterArgs, row });
        });
      }

      return filters?.some((filterArgs: TableFilterArgs) => {
        return processFilter({ ...filterArgs, row });
      });
    };

    setFilter({ filter, filterId: 'FILTER_CUSTOM' });
    closePanel();
  };

  return (
    <Button primary onClick={onClick}>
      Apply {filters?.length} Filters
    </Button>
  );
};

export default TableFilterPanelApplyButton;
