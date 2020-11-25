/**
 * @fileoverview Component: PaginationBar
 * @author Rami Abdou
 */

import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import Button from '@components/Button/Button';
import { ValueProps } from '@constants';
import CSSModifier from '@util/CSSModifier';
import Table from '../../Table.store';

type PaginationValue = number | '...';

/**
 * RETURNS an array of pagination values inserting ellipses at the correct
 * spots in the array. There should a maximum of 6 numbers in the result, and
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
  else if (currIndex < initialLength - 3)
    middleChunk = arr.slice(currIndex - 2, currIndex + 3);
  else if (
    [initialLength - 1, initialLength - 2, initialLength - 3].includes(
      currIndex
    )
  )
    middleChunk = arr.slice(initialLength - 6, initialLength - 1);

  const result = [arr[0], ...middleChunk, arr[initialLength - 1]];

  if (result[1] - result[0] > 1) result.splice(1, 0, '...');
  if (result[result.length - 1] - result[result.length - 2] > 1)
    result.splice(result.length - 1, 0, '...');

  return result;
};

const PaginationNumber = ({ value }: ValueProps) => {
  const page = Table.useStoreState((store) => store.page);
  const setRange = Table.useStoreActions((store) => store.setRange);

  const isEllipses = value === '...';

  const { css } = new CSSModifier()
    .class('c-table-pagination-btn')
    .addClass(page === value, 'c-table-pagination-btn--active')
    .addClass(isEllipses, 'c-table-pagination-btn--ellipses');

  const onClick = () => !isEllipses && setRange(value);

  return (
    <Button key={value} className={css} onClick={onClick}>
      {isEllipses ? '...' : value + 1}
    </Button>
  );
};

const BackButton = () => {
  const page = Table.useStoreState((store) => store.page);
  const setRange = Table.useStoreActions((store) => store.setRange);

  return (
    <Button
      className="c-table-pagination-arrow"
      onClick={() => page > 0 && setRange(page - 1)}
    >
      <IoIosArrowBack />
    </Button>
  );
};

const NextButton = () => {
  const page = Table.useStoreState((store) => store.page);
  const setRange = Table.useStoreActions((store) => store.setRange);
  const numPages = Table.useStoreState(({ filteredData }) =>
    Math.ceil(filteredData.length / 100)
  );

  return (
    <Button
      className="c-table-pagination-arrow"
      onClick={() => page < numPages - 1 && setRange(page + 1)}
    >
      <IoIosArrowForward />
    </Button>
  );
};

export default () => {
  const page = Table.useStoreState((store) => store.page);
  const numPages = Table.useStoreState(({ filteredData }) =>
    Math.ceil(filteredData.length / 100)
  );
  const nums = getPaginationValues(Array.from(Array(numPages).keys()), page);

  return (
    <div className="c-table-pagination-row">
      <BackButton />

      {nums.map((value: any, i: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <PaginationNumber key={`${i}-${value}`} value={value} />
      ))}

      <NextButton />
    </div>
  );
};
