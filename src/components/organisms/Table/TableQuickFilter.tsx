import React, { useEffect, useState } from 'react';

import Button from '@atoms/Button/Button';
import { IdProps, ShowProps, TitleProps } from '@constants';
import { TableRow } from '@organisms/Table/Table.types';
import { cx } from '@util/util';
import TableStore from './Table.store';

interface TableQuickFilterProps extends IdProps, ShowProps, TitleProps {
  filter: (rows: TableRow) => boolean;
}

const TableQuickFilter: React.FC<TableQuickFilterProps> = ({
  id: filterId,
  filter,
  show,
  title
}) => {
  const [active, setActive] = useState(false);

  const addFilter = TableStore.useStoreActions((store) => store.addFilter);
  const filters = TableStore.useStoreState((store) => store.filters);

  const removeFilter = TableStore.useStoreActions(
    (store) => store.removeFilter
  );

  useEffect(() => {
    if (active && !filters[filterId]) addFilter({ filter, filterId });
    else if (!active && !!filters[filterId]) removeFilter(filterId);
  }, [active]);

  const onClick = () => setActive(!active);

  const css = cx('o-table-quick-filter', {
    'o-table-quick-filter--active': active
  });

  return (
    <Button className={css} show={show} onClick={onClick}>
      {title}
    </Button>
  );
};

export default TableQuickFilter;
