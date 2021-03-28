import deepequal from 'fast-deep-equal';
import { nanoid } from 'nanoid';
import React from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import { ValueProps } from '@util/constants';
import { cx } from '@util/util';
import TableStore from '../Table.store';
import { TablePaginationValue } from '../Table.types';
import { getPaginationValues } from '../Table.util';

const TablePaginationBarNumber: React.FC<ValueProps> = ({ value }) => {
  const active = TableStore.useStoreState(({ page }) => {
    return page === value;
  });

  const setPage = TableStore.useStoreActions((store) => {
    return store.setPage;
  });

  const isEllipses = value === '...';

  const onClick = () => {
    return !isEllipses && setPage(value);
  };

  const css: string = cx('o-table-pagination-num', {
    'o-table-pagination-num--active': active,
    'o-table-pagination-num--ellipses': isEllipses
  });

  return (
    <Button key={value} className={css} onClick={onClick}>
      {isEllipses ? '...' : value + 1}
    </Button>
  );
};

const TablePaginationBarBackButton: React.FC = () => {
  const page = TableStore.useStoreState((state) => {
    return state.page;
  });

  const setPage = TableStore.useStoreActions((store) => {
    return store.setPage;
  });

  const onClick = () => {
    return page > 0 && setPage(page - 1);
  };

  return (
    <Button className="o-table-pagination-chevron" onClick={onClick}>
      <IoChevronBackOutline />
    </Button>
  );
};

const TablePaginationBarNextButton: React.FC = () => {
  const page = TableStore.useStoreState((state) => {
    return state.page;
  });

  const setPage = TableStore.useStoreActions((store) => {
    return store.setPage;
  });

  const numPages = TableStore.useStoreState(({ filteredRows }) => {
    return Math.ceil(filteredRows.length / 50);
  });

  const onClick = () => {
    return page < numPages - 1 && setPage(page + 1);
  };

  return (
    <Button className="o-table-pagination-chevron" onClick={onClick}>
      <IoChevronForwardOutline />
    </Button>
  );
};

const TablePaginationBar: React.FC = () => {
  const nums: TablePaginationValue[] = TableStore.useStoreState(
    ({ filteredRows, page }) => {
      const numPages = Math.ceil(filteredRows.length / 50);
      return getPaginationValues(Array.from(Array(numPages).keys()), page);
    },
    deepequal
  );

  return (
    <Row>
      <TablePaginationBarBackButton />

      {nums.map((value: any) => {
        return <TablePaginationBarNumber key={nanoid()} value={value} />;
      })}

      <TablePaginationBarNextButton />
    </Row>
  );
};

export default TablePaginationBar;
