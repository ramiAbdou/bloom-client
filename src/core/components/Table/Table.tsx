import React, { memo, useEffect, useState } from 'react';

import { Function } from '@constants';
import Body from './components/Body';
import ColumnPicker from './components/ColumnPicker/ColumnPicker';
import Header from './components/Header';
import Pagination from './components/Pagination/Pagination';
import SelectAllBanner from './components/SelectAllBanner/SelectAllBanner';
import Table from './Table.store';

const TableContent = () => {
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
    <div id="c-table-ctr" style={{ maxHeight }}>
      <table className="c-table">
        <Header />
        <Body />
      </table>
    </div>
  );
};

type TableProps = { onRenameColumn?: Function };

export default memo(({ onRenameColumn }: TableProps) => {
  const isAllPageSelected = Table.useStoreState(
    (store) => store.isAllPageSelected
  );

  const setOnRenameColumn = Table.useStoreActions(
    (store) => store.setOnRenameColumn
  );

  useEffect(() => {
    if (onRenameColumn) setOnRenameColumn(onRenameColumn);
  }, []);

  return (
    <>
      {isAllPageSelected && <SelectAllBanner />}
      <TableContent />
      <Pagination />
      <ColumnPicker />
    </>
  );
});
