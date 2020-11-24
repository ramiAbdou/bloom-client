/**
 * @fileoverview Component: Table
 * @author Rami Abdou
 */

import './Table.scss';

import React, { useEffect, useState } from 'react';

import { useStoreState } from '@store/Store';
import Body from './components/Body';
import Header from './components/Header';
import PaginationBar from './components/PaginationBar';

const TABLE_HEIGHT = 60 * 8;

export default () => {
  const [height, setHeight] = useState(0);
  const windowWidth = useStoreState(({ screen }) => screen.windowWidth);

  useEffect(() => {
    setHeight(TABLE_HEIGHT * (window.innerHeight / 710));
  }, [windowWidth]);

  return (
    <>
      <div id="c-table-ctr" style={{ maxHeight: height }}>
        <table className="c-table">
          <Header />
          <Body />
        </table>
      </div>

      <PaginationBar />
    </>
  );
};
