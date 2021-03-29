import React, { useEffect, useState } from 'react';

import Button from '@atoms/Button/Button';
import { TableRow } from '@organisms/Table/Table.types';
import { ShowProps, TitleProps } from '@util/constants';
import { cx } from '@util/util';
import TableStore from './Table.store';

interface TableQuickFilterProps extends ShowProps, TitleProps {
  filter: (row: TableRow) => boolean;
}

const TableQuickFilter: React.FC<TableQuickFilterProps> = (props) => {
  const { filter, show, title } = props;
  const [active, setActive] = useState<boolean>(false);
  const filters = TableStore.useStoreState((state) => state.filters);
  const setFilter = TableStore.useStoreActions((state) => state.setFilter);

  const removeFilter = TableStore.useStoreActions(
    (state) => state.removeFilter
  );

  useEffect(() => {
    if (active && !filters[title]) setFilter({ filter, filterId: title });
    else if (!active && !!filters[title]) removeFilter(title);
  }, [active]);

  const onClick = () => setActive(!active);

  const css: string = cx('f f-ac meta o-table-quick-filter', {
    'o-table-quick-filter--active': active
  });

  return (
    <Button className={css} show={show} onClick={onClick}>
      + {title}
    </Button>
  );
};

export default TableQuickFilter;
