import React, { useCallback, useEffect, useState } from 'react';

import { Function } from '@constants';
import useTraceUpdate from '@hooks/useTraceUpdate';
import Body from './components/Body';
import ColumnPicker from './components/ColumnPicker';
import Header from './components/Header';
import Pagination from './components/Pagination/Pagination';
import SelectedBanner from './components/SelectedBanner';
import Table from './Table.store';

type TableProps = { onRenameColumn?: Function };

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

export default () => {
  const isAllPageSelected = Table.useStoreState(
    (store) => store.isAllPageSelected
  );

  // const memoizedOnRenameColumn = useCallback(onRenameColumn, []);

  // useTraceUpdate({ memoizedOnRenameColumn });

  return (
    <>
      {isAllPageSelected && <SelectedBanner />}
      <TableContent />
      <Pagination />
      <ColumnPicker />
    </>
  );
};
