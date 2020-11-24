/**
 * @fileoverview Component: PaginationBar
 * @author Rami Abdou
 */

import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import Button from '@components/Button/Button';
import Meta from '@components/Typography/Meta';
import CSSModifier from '@util/CSSModifier';
import Table from '../Table.store';

const RangeRow = () => {
  const range = Table.useStoreState((store) => store.range);
  const setRange = Table.useStoreActions((store) => store.setRange);
  const numPages = Table.useStoreState(({ filteredData }) =>
    Math.ceil(filteredData.length / 100)
  );

  const nums = Array.from(Array(numPages).keys()).reduce(
    (acc: any[], curr: number) => {
      if (curr > 5 && curr < numPages - 1) {
        if (!acc.includes('...')) return [...acc, '...'];
        return acc;
      }

      return [...acc, curr];
    },
    []
  );

  return (
    <div className="c-table-pagination-row">
      <Button onClick={() => range > 0 && setRange(range - 1)}>
        <IoIosArrowBack />
      </Button>

      {nums.map((num: any) => {
        const isEllipses = num === '...';

        const { css } = new CSSModifier()
          .class('c-table-pagination-btn')
          .addClass(range === num, 'c-table-pagination-btn--active');

        const onClick = () => !isEllipses && setRange(num);

        return (
          <Button key={num} className={css} onClick={onClick}>
            {isEllipses ? '...' : num + 1}
          </Button>
        );
      })}

      <Button onClick={() => range < numPages && setRange(range + 1)}>
        <IoIosArrowForward />
      </Button>
    </div>
  );
};

export default () => {
  const range = Table.useStoreState((store) => store.range);
  const numData = Table.useStoreState((store) => store.filteredData.length);

  const floor = range * 100 + 1;
  const ceiling = numData - floor >= 99 ? floor + 99 : numData;

  return (
    <div className="c-table-pagination-ctr">
      <Meta>
        Displaying {floor}-{ceiling} of {numData} results.
      </Meta>
      <RangeRow />
    </div>
  );
};
