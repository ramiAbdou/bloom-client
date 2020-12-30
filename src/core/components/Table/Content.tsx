import React, { useEffect, useState } from 'react';

import Body from './components/Body';
import ColumnPicker from './components/ColumnPicker/ColumnPicker';
import Header from './components/Header';
import Pagination from './components/Pagination/Pagination';
import SelectAllBanner from './components/SelectAllBanner/SelectAllBanner';
import Table from './Table.store';

export default () => {
  const [maxHeight, setMaxHeight] = useState(0);

  const isAllPageSelected = Table.useStoreState(
    (store) => store.isAllPageSelected
  );

  const { innerHeight } = window;

  useEffect(() => {
    // Takes into account both the window's innerHeight and whether or not
    // there is the selected banner showing.
    setMaxHeight(60 * 8 * (innerHeight / 710) - (isAllPageSelected ? 60 : 0));
  }, [isAllPageSelected, innerHeight]);

  return (
    <>
      {isAllPageSelected && <SelectAllBanner />}

      <div id="c-table-ctr" style={{ maxHeight }}>
        <table className="c-table">
          <Header />
          <Body />
        </table>
      </div>

      <Pagination />
      <ColumnPicker />
    </>
  );
};
