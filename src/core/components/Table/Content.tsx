import React, { useEffect, useState } from 'react';

import ColumnPicker from './components/ColumnPicker/ColumnPicker';
import Pagination from './components/Pagination/Pagination';
import SelectAllBanner from './components/SelectAllBanner/SelectAllBanner';
import BodyContainer from './containers/Body';
import HeaderContainer from './containers/Header';
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
          <HeaderContainer />
          <BodyContainer />
        </table>
      </div>

      <Pagination />
      <ColumnPicker />
    </>
  );
};
