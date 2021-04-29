import React from 'react';

import Dropdown from '@components/molecules/Dropdown/Dropdown';
import {
  useTable,
  useTableColumn,
  useTableFilter
} from '@components/organisms/Table/Table.state';
import {
  TableColumn,
  TableFilter
} from '@components/organisms/Table/Table.types';
import { IdProps } from '@util/constants';

const FilterTablePanelRowColumnDropdown: React.FC<IdProps> = ({
  id: filterId
}) => {
  const [{ columns }, tableDispatch] = useTable();

  const filter: TableFilter = useTableFilter(filterId);
  const column: TableColumn = useTableColumn({ columnId: filter.columnId });

  const onSelect = (updatedTitle: string) => {
    const updatedColumnId: string = columns.find(
      (value: TableColumn) => value.title === updatedTitle
    )?.id;

    tableDispatch({
      filterId,
      type: 'SET_FILTER',
      updatedFilter: { columnId: updatedColumnId }
    });
  };

  return (
    <Dropdown
      options={{ attribute: false }}
      selectedValues={[column?.title]}
      values={columns?.map((value: TableColumn) => value.title)}
      onSelect={onSelect}
    />
  );
};

export default FilterTablePanelRowColumnDropdown;
