import React from 'react';
import { IoFilter } from 'react-icons/io5';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { PanelType } from '@constants';
import useTooltip from '@hooks/useTooltip';
import { useStoreActions } from '@store/Store';
import TableStore from '../Table.store';

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
      className="o-table-action"
      id={PanelType.FILTER_TABLE}
      show={!isAnythingSelected}
      onClick={onClick}
    >
      <IoFilter />
    </Button>
  );
};

export default TableFilterButton;
