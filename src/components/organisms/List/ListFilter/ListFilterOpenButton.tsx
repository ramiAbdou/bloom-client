import React from 'react';
import { IoFilter } from 'react-icons/io5';

import Button, { ButtonProps } from '@atoms/Button/Button';
import useTooltip from '@hooks/useTooltip';
import { useStoreActions } from '@store/Store';
import { PanelType } from '@util/constants';
import { cx } from '@util/util';
import ListStore from '../List.store';

const ListFilterButtonActiveTag: React.FC = () => {
  const numCustomFilters: number = ListStore.useStoreState(
    (state) => Object.keys(state.customFilters)?.length
  );

  return numCustomFilters ? <div>{numCustomFilters}</div> : null;
};

const ListFilterOpenButton: React.FC<Partial<ButtonProps>> = (props) => {
  const { className } = props;
  const showPanel = useStoreActions(({ panel }) => panel.showPanel);
  const onClick = () => showPanel({ id: PanelType.FILTER_LIST });
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
      id={PanelType.FILTER_LIST}
      onClick={onClick}
    >
      <IoFilter />
      <ListFilterButtonActiveTag />
    </Button>
  );
};

export default ListFilterOpenButton;
