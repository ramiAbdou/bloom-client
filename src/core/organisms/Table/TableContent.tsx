import React, { useEffect, useState } from 'react';

import ColumnPicker from './Panel/Panel';
import SelectAllBanner from './SelectAllBanner/SelectAllBanner';
import Table from './Table.store';
import BodyContainer from './TableBodyContainer';
import HeaderContainer from './TableHeaderContainer';
import Pagination from './TablePagination/Pagination';

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
