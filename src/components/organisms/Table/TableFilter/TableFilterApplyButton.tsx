import React from 'react';

import Button from '@atoms/Button/Button';
import { useStoreActions } from '@store/Store';
import TableStore from '../Table.store';
import { TableFilter, TableFilterArgs, TableRow } from '../Table.types';
import TableFilterStore from './TableFilter.store';

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

const TableFilterApplyButton: React.FC = () => {
  const closePanel = useStoreActions(({ panel }) => panel.closePanel);

  const joinOperator = TableFilterStore.useStoreState(
    (store) => store.joinOperator
  );

  const filters: TableFilterArgs[] = TableFilterStore.useStoreState((store) =>
    Object.values(store.filters)
  );

  const setFilter = TableStore.useStoreActions((store) => store.setFilter);

  const onClick = () => {
    const filter: TableFilter = (row: TableRow) => {
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

export default TableFilterApplyButton;
