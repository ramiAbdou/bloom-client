import React, { useEffect, useState } from 'react';

import Button from '@atoms/Button/Button';
import { TableRow } from '@organisms/Table/Table.types';
import { BaseProps, IdProps, TitleProps } from '@util/constants';
import { cx } from '@util/util';
import ListStore from '../List.store';

interface ListQuickFilterProps extends BaseProps, IdProps, TitleProps {
  filter: (row: TableRow) => boolean;
}

const ListQuickFilter: React.FC<ListQuickFilterProps> = (props) => {
  const { className, id, filter, show, title } = props;
  const filterId: string = id ?? title;

  const [active, setActive] = useState<boolean>(false);

  const filters = ListStore.useStoreState((state) => {
    return state.filters;
  });

  const setFilter = ListStore.useStoreActions((state) => {
    return state.setFilter;
  });

  const removeFilter = ListStore.useStoreActions((state) => {
    return state.removeFilter;
  });

  useEffect(() => {
    if (active && !filters[filterId]) setFilter({ filter, filterId });
    else if (!active && !!filters[filterId]) removeFilter(filterId);
  }, [active]);

  const onClick = () => {
    return setActive(!active);
  };

  const css: string = cx(
    'o-list-quick-filter',
    { 'o-list-quick-filter--active': active },
    className
  );

  return (
    <Button className={css} show={show} onClick={onClick}>
      + {title}
    </Button>
  );
};

export default ListQuickFilter;
