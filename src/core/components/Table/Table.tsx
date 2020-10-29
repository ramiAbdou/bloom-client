/**
 * @fileoverview Component: Table
 * @author Rami Abdou
 */

import './Table.scss';

import React from 'react';

import Body from './components/Body';
import Header from './components/Header';

export default () => (
  <div className="c-table-ctr">
    <table className="c-table">
      <Header />
      <Body />
    </table>
  </div>
);
