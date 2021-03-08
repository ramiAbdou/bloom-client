import React, { useEffect, useState } from 'react';

import Button from '@atoms/Button/Button';
import { TableRow } from '@organisms/Table/Table.types';
import { IdProps, ShowProps, TitleProps } from '@util/constants';
import { cx } from '@util/util';
import TableStore from './Table.store';

interface TableQuickFilterProps extends IdProps, ShowProps, TitleProps {
  filter: (row: TableRow) => boolean;
}

const TableQuickFilter: React.FC<TableQuickFilterProps> = ({
  id: filterId,
  filter,
  show,
  title
}) => {
  filterId = filterId ?? title;

  const [active, setActive] = useState<boolean>(false);

  const filters = TableStore.useStoreState((state) => state.filters);
  const setFilter = TableStore.useStoreActions((store) => store.setFilter);

  const removeFilter = TableStore.useStoreActions(
    (store) => store.removeFilter
  );

  useEffect(() => {
    if (active && !filters[filterId]) setFilter({ filter, filterId });
    else if (!active && !!filters[filterId]) removeFilter(filterId);
  }, [active]);

  const onClick = () => setActive(!active);

  const css = cx('o-table-quick-filter', {
    'o-table-quick-filter--active': active
  });

  return (
    <Button className={css} show={show} onClick={onClick}>
      + {title}
    </Button>
  );
};

export default TableQuickFilter;
