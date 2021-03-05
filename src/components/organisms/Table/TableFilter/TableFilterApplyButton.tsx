import React from 'react';

import Button from '@atoms/Button/Button';
import { useStoreActions } from '@store/Store';
import TableStore from '../Table.store';
import { TableFilter, TableFilterArgs, TableRow } from '../Table.types';
import TableFilterStore from './TableFilter.store';

interface ProcessFilterArgs extends TableFilterArgs {
  row: TableRow;
}

const processFilter = ({
  columnId,
  operator,
  row,
  value
}: ProcessFilterArgs) => {
  const rowValue: any = row[columnId]?.toString()?.toLowerCase();
  value = value?.toString()?.toLowerCase();

  if (operator === 'includes') return rowValue?.includes(value);
  if (operator === 'is') return rowValue === value;
  if (operator === 'is not') return rowValue !== value;
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
