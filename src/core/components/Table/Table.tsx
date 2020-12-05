import React, { useEffect, useState } from 'react';

import { Function } from '@constants';
import { useStoreState } from '@store/Store';
import Body from './components/Body';
import ColumnPicker from './components/ColumnPicker';
import Header from './components/Header';
import Pagination from './components/Pagination/Pagination';
import SelectedBanner from './components/SelectedBanner';
import Table from './Table.store';

const TABLE_HEIGHT = 60 * 8;

type TableProps = { onRenameColumn?: Function };

export default ({ onRenameColumn }: TableProps) => {
  const [height, setHeight] = useState(0);

  const isAllPageSelected = Table.useStoreState(
    (store) => store.isAllPageSelected
  );

  const columns = Table.useStoreState((store) => store.columns);

  const { innerHeight } = window;

  useEffect(() => {
    // Takes into account both the window's innerHeight and whether or not
    // there is the selected banner showing.
    setHeight(60 * 8 * (innerHeight / 710) - (isAllPageSelected ? 60 : 0));
  }, [isAllPageSelected, innerHeight]);

  return (
    <>
      {isAllPageSelected && <SelectedBanner />}
      <div id="c-table-ctr" style={{ maxHeight: height }}>
        <table className="c-table">
          <Header />
          <Body />
        </table>
      </div>

      <Pagination />

      {columns.map(({ id, title, version }) => (
        <ColumnPicker
          key={id}
          id={id}
          title={title}
          version={version}
          onRenameColumn={onRenameColumn}
        />
      ))}
    </>
  );
};
