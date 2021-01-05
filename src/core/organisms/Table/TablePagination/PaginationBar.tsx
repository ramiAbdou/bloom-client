import deepequal from 'fast-deep-equal';
import React from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

import Button from '@atoms/Button';
import { ValueProps } from '@constants';
import { makeClass, uuid } from '@util/util';
import Table from '../Table.store';

type PaginationValue = number | '...';

/**
 * RETURNS an array of pagination values inserting ellipses at the correct
 * spots in the array. There should a maximum of 7 numbers in the result, and
 * no more than 2 ellipses in the array. The first and last numbers should
 * always be present in the result.
 *
 * @param arr The array of numbers representing page numbers.
 * @param currIndex The current page number.
 */
const getPaginationValues = (
  arr: number[],
  currIndex: number
): PaginationValue[] => {
  const { length: initialLength } = arr;
  if (initialLength <= 7) return arr;

  let middleChunk = [];

  if ([0, 1, 2].includes(currIndex)) middleChunk = arr.slice(1, 6);
  else if (currIndex < initialLength - 3) {
    middleChunk = arr.slice(currIndex - 2, currIndex + 3);
  } else if (
    [initialLength - 1, initialLength - 2, initialLength - 3].includes(
      currIndex
    )
  ) {
    middleChunk = arr.slice(initialLength - 6, initialLength - 1);
  }

  // The first and last number are always displaying, we just need to find
  // what the middle numbers are.
  const result = [arr[0], ...middleChunk, arr[initialLength - 1]];
  const { length } = result;

  // If there is a difference greater than 1 between the first and second
  // element, insert an ellipses at location 1.
  if (result[1] - result[0] > 1) result.splice(1, 0, '...');

  // If there is a difference greater than 1 between the last and second to
  // last element, insert an ellipses before the last element..
  if (result[length - 1] - result[length - 2] > 1) {
    result.splice(length - 1, 0, '...');
  }

  return result;
};

const PaginationNumber = ({ value }: ValueProps) => {
  const page = Table.useStoreState((store) => store.page);
  const setRange = Table.useStoreActions((store) => store.setRange);

  const isEllipses = value === '...';
  const onClick = () => !isEllipses && setRange(value);

  const css = makeClass([
    'c-table-pagination-num',
    [page === value, 'c-table-pagination-num--active'],
    [isEllipses, 'c-table-pagination-num--ellipses']
  ]);

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
        <PaginationNumber key={uuid()} value={value} />
      ))}

      <NextButton />
    </div>
  );
};
