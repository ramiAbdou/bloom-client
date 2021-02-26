import React from 'react';
import { IoFilter } from 'react-icons/io5';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { PanelType } from '@util/constants';
import useTooltip from '@hooks/useTooltip';
import { useStoreActions } from '@store/Store';
import TableStore from '../Table.store';
import TableFilterStore from './TableFilter.store';

const TableFilterButtonNumActiveTag: React.FC = () => {
  const isCustomFilterApplied: boolean = TableStore.useStoreState((state) =>
    Object.keys(state.filters).includes('FILTER_CUSTOM')
  );

  const numActiveFilters: number = TableFilterStore.useStoreState((state) => {
    return state.filterIds.length;
  });

  if (!isCustomFilterApplied || numActiveFilters === 0) return null;
  return <div>{numActiveFilters}</div>;
};

const TableFilterButton: React.FC<Partial<ButtonProps>> = () => {
  const showPanel = useStoreActions(({ panel }) => panel.showPanel);

  const isAnythingSelected: boolean = TableStore.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  const onClick = () => showPanel({ id: PanelType.FILTER_TABLE });
  const ref: React.MutableRefObject<HTMLElement> = useTooltip('Filter');

  return (
    <Button
      ref={ref}
      className="o-table-action o-table-filter-active-tag"
      id={PanelType.FILTER_TABLE}
      show={!isAnythingSelected}
      onClick={onClick}
    >
      <IoFilter />
      <TableFilterButtonNumActiveTag />
    </Button>
  );
};

export default TableFilterButton;
