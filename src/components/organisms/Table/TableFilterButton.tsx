import React from 'react';
import { IoFilter } from 'react-icons/io5';

import Button, { ButtonProps } from '@atoms/Button/Button';
import useTooltip from '@hooks/useTooltip';
import { useStoreActions } from '@store/Store';
import { PanelType } from '@util/constants';
import { cx } from '@util/util';
import TableStore from './Table.store';
import TableFilterPanelStore from './TableFilterPanel/TableFilterPanel.store';

const TableFilterButtonNumActiveTag: React.FC = () => {
  const isCustomFilterApplied: boolean = TableStore.useStoreState((state) =>
    Object.keys(state.filters).includes('FILTER_CUSTOM')
  );

  const numActiveFilters: number = TableFilterPanelStore.useStoreState(
    (state) => state.filterIds.length
  );

  if (!isCustomFilterApplied || numActiveFilters === 0) return null;
  return <div>{numActiveFilters}</div>;
};

const TableFilterButton: React.FC<Partial<ButtonProps>> = (props) => {
  const { className } = props;
  const showPanel = useStoreActions(({ panel }) => panel.showPanel);

  const isAnythingSelected: boolean = TableStore.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  const onClick = () => showPanel({ id: PanelType.FILTER_TABLE });
  const ref: React.MutableRefObject<HTMLElement> = useTooltip('Filter');

  const css: string = cx(
    'o-table-action o-table-filter-active-tag',
    {},
    className
  );

  return (
    <Button
      ref={ref}
      className={css}
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
