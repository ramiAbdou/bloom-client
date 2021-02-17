import React, { useEffect, useState } from 'react';

import Button from '@atoms/Button/Button';
import { IdProps, ShowProps, TitleProps } from '@constants';
import { TableRow } from '@organisms/Table/Table.types';
import { cx } from '@util/util';
import ListStore from '../List.store';

interface ListQuickFilterProps extends IdProps, ShowProps, TitleProps {
  filter: (row: TableRow) => boolean;
}

const ListQuickFilter: React.FC<ListQuickFilterProps> = ({
  id: filterId,
  filter,
  show,
  title
}) => {
  const [active, setActive] = useState<boolean>(false);

  const filters = ListStore.useStoreState((store) => store.filters);
  const setFilter = ListStore.useStoreActions((store) => store.setFilter);
  const removeFilter = ListStore.useStoreActions((store) => store.removeFilter);

  useEffect(() => {
    if (active && !filters[filterId]) setFilter({ filter, filterId });
    else if (!active && !!filters[filterId]) removeFilter(filterId);
  }, [active]);

  const onClick = () => setActive(!active);

  const css = cx('o-list-quick-filter', {
    'o-list-quick-filter--active': active
  });

  return (
    <Button className={css} show={show} onClick={onClick}>
      + {title}
    </Button>
  );
};

export default ListQuickFilter;
