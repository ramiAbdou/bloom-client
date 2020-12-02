/**
 * @fileoverview Component: Table
 * @author Rami Abdou
 */

import './Table.scss';

import React, { useCallback, useEffect, useState } from 'react';

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
  const windowWidth = useStoreState(({ screen }) => screen.windowWidth);
  const isAllPageSelected = Table.useStoreState(
    (store) => store.isAllPageSelected
  );
  const columns = Table.useStoreState((store) => store.columns);

  useEffect(() => {
    setHeight(
      TABLE_HEIGHT * (window.innerHeight / 710) - (isAllPageSelected ? 60 : 0)
    );
  }, [isAllPageSelected, windowWidth]);

  const memoizedOnRenameColumn = useCallback(onRenameColumn, []);

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

      {columns.map(({ id, title }) => (
        <ColumnPicker
          key={id}
          id={id}
          title={title}
          onRenameColumn={memoizedOnRenameColumn}
        />
      ))}
    </>
  );
};
