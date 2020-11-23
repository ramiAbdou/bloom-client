/**
 * @fileoverview Component: Table
 * @author Rami Abdou
 */

import './Table.scss';

import React, { useEffect, useRef, useState } from 'react';

import { useStoreState } from '@store/Store';
import Body from './components/Body';
import Header from './components/Header';
import PaginationBar from './components/PaginationBar';

export default () => {
  const [height, setHeight] = useState(0);
  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  const windowWidth = useStoreState(({ screen }) => screen.windowWidth);

  useEffect(() => {
    if (!ref?.current) return;

    const maxScreenHeight =
      window.screen.availHeight - (window.outerHeight - window.innerHeight);

    setHeight(maxScreenHeight - ref.current.offsetTop);
  }, [ref, windowWidth]);

  return (
    <>
      <div ref={ref} className="c-table-ctr" style={{ maxHeight: height - 96 }}>
        <table className="c-table">
          <Header />
          <Body />
        </table>
      </div>

      <PaginationBar />
    </>
  );
};
