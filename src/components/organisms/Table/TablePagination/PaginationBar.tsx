import deepequal from 'fast-deep-equal';
import { nanoid } from 'nanoid';
import React from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { ValueProps } from '@constants';
import { cx } from '@util/util';
import Table from '../Table.store';
import { PaginationValue } from '../Table.types';
import { getPaginationValues } from '../Table.util';

const PaginationNumber = ({ value }: ValueProps) => {
  const page = Table.useStoreState((store) => store.page);
  const setRange = Table.useStoreActions((store) => store.setRange);

  const isEllipses = value === '...';
  const onClick = () => !isEllipses && setRange(value);

  const css = cx('c-table-pagination-num', {
    'c-table-pagination-num--active': page === value,
    'c-table-pagination-num--ellipses': isEllipses
  });

  return (
    <Button key={value} className={css} onClick={onClick}>
      {isEllipses ? '...' : value + 1}
    </Button>
  );
};

const BackButton = () => {
  const page = Table.useStoreState((store) => store.page);
  const setRange = Table.useStoreActions((store) => store.setRange);

  const onClick = () => page > 0 && setRange(page - 1);

  return (
    <Button className="c-table-pagination-chevron" onClick={onClick}>
      <IoChevronBackOutline />
    </Button>
  );
};

const NextButton = () => {
  const page = Table.useStoreState((store) => store.page);
  const setRange = Table.useStoreActions((store) => store.setRange);

  const numPages = Table.useStoreState(({ filteredData }) =>
    Math.ceil(filteredData.length / 100)
  );

  const onClick = () => page < numPages - 1 && setRange(page + 1);

  return (
    <Button className="c-table-pagination-chevron" onClick={onClick}>
      <IoChevronForwardOutline />
    </Button>
  );
};

export default () => {
  const nums: PaginationValue[] = Table.useStoreState(
    ({ filteredData, page }) => {
      const numPages = Math.ceil(filteredData.length / 100);
      return getPaginationValues(Array.from(Array(numPages).keys()), page);
    },
    deepequal
  );

  return (
    <div className="c-table-pagination-row">
      <BackButton />

      {nums.map((value: any) => (
        <PaginationNumber key={nanoid()} value={value} />
      ))}

      <NextButton />
    </div>
  );
};
