import React from 'react';
import { IoFilter } from 'react-icons/io5';

import Button, { ButtonProps } from '@components/atoms/Button/Button';
import { useTableState } from '@components/organisms/Table/Table.state';
import { TableState } from '@components/organisms/Table/Table.types';
import { useStoreActions } from '@core/store/Store';
import useTooltip from '@hooks/useTooltip';
import { PanelType } from '@util/constants';
import { cx } from '@util/util';

const TableFilterButtonNumActiveTag: React.FC = () => {
  const { appliedFilterIds }: TableState = useTableState();
  const appliedFiltersCount: number = appliedFilterIds.length;
  return appliedFiltersCount ? <div>{appliedFiltersCount}</div> : null;
};

const TableFilterButton: React.FC<Partial<ButtonProps>> = ({ className }) => {
  const { selectedRowIds }: TableState = useTableState();
  const showPanel = useStoreActions(({ panel }) => panel.showPanel);

  const isAnythingSelected: boolean = !!selectedRowIds.length;

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
