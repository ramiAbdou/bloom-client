/**
 * @fileoverview Component: Table
 * @author Rami Abdou
 */

import './Table.scss';

import React, { useEffect, useState } from 'react';

import { useStoreState } from '@store/Store';
import Body from './components/Body';
import Header from './components/Header';
import Pagination from './components/Pagination/Pagination';
import SelectedBanner from './components/SelectedBanner';
import Table from './Table.store';

const TABLE_HEIGHT = 60 * 8;

export default () => {
  const [height, setHeight] = useState(0);
  const windowWidth = useStoreState(({ screen }) => screen.windowWidth);
  const isAllPageSelected = Table.useStoreState(
    (store) => store.isAllPageSelected
  );

  useEffect(() => {
    setHeight(
      TABLE_HEIGHT * (window.innerHeight / 710) - (isAllPageSelected ? 60 : 0)
    );
  }, [isAllPageSelected, windowWidth]);

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
    </>
  );
};
