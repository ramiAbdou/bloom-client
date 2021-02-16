import React from 'react';
import { IoFilter } from 'react-icons/io5';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { PanelType } from '@constants';
import useTooltip from '@hooks/useTooltip';
import { useStoreActions } from '@store/Store';
// import ListStore from './List.store';

// const ListFilterButtonNumActiveTag: React.FC = () => {
//   const isCustomFilterApplied: boolean = ListStore.useStoreState((state) =>
//     Object.keys(state.filters).includes('FILTER_CUSTOM')
//   );

//   const numActiveFilters = 0;

//   // const numActiveFilters: number = TableFilterStore.useStoreState((state) => {
//   //   return state.filterIds.length;
//   // });

//   if (!isCustomFilterApplied || numActiveFilters === 0) return null;
//   return <div>{numActiveFilters}</div>;
// };

const ListFilterButton: React.FC<Partial<ButtonProps>> = () => {
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
      {/* <ListFilterButtonNumActiveTag /> */}
    </Button>
  );
};

export default ListFilterButton;
