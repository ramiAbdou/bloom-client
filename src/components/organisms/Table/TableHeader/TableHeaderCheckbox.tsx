import React from 'react';

import Checkbox from '@atoms/Checkbox/Checkbox';
import TableStore from '../Table.store';

const TableHeaderCheckbox: React.FC = () => {
  const isAllPageSelected: boolean = TableStore.useStoreState(
    ({ filteredRows, range, selectedRowIds }) => {
      return (
        !!selectedRowIds.length &&
        filteredRows.slice(range[0], range[1]).every(({ id: rowId }) => {
          return selectedRowIds.includes(rowId);
        })
      );
    }
  );

  const toggleAllPageRows = TableStore.useStoreActions((store) => {
    return store.toggleAllPageRows;
  });

  const onChange = () => {
    return toggleAllPageRows();
  };

  return (
    <Checkbox
      checked={isAllPageSelected}
      className="o-table-select"
      onChange={onChange}
    />
  );
};

export default TableHeaderCheckbox;
