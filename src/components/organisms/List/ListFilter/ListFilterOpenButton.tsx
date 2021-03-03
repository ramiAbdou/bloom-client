import React from 'react';
import { IoFilter } from 'react-icons/io5';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { PanelType } from '@util/constants';
import useTooltip from '@hooks/useTooltip';
import { useStoreActions } from '@store/Store';
import ListStore from '../List.store';

const ListFilterButtonActiveTag: React.FC = () => {
  const numCustomFilters: number = ListStore.useStoreState((state) => {
    return Object.keys(state.customFilters)?.length;
  });

  return numCustomFilters ? <div>{numCustomFilters}</div> : null;
};

const ListFilterOpenButton: React.FC<Partial<ButtonProps>> = () => {
  const showPanel = useStoreActions(({ panel }) => panel.showPanel);
  const onClick = () => showPanel({ id: PanelType.FILTER_LIST });
  const ref: React.MutableRefObject<HTMLElement> = useTooltip('Filter');

  return (
    <Button
      ref={ref}
      className="o-table-action o-table-filter-active-tag"
      id={PanelType.FILTER_LIST}
      onClick={onClick}
    >
      <IoFilter />
      <ListFilterButtonActiveTag />
    </Button>
  );
};

export default ListFilterOpenButton;
