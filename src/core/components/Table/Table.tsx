/**
 * @fileoverview Component: Table
 * @author Rami Abdou
 */

import './Table.scss';

import React from 'react';

import Body from './components/Body';
import Header from './components/Header';
import Table, { TableStoreInitializer } from './Table.store';

const TableContent = () => (
  <div className="c-table-ctr">
    <table className="c-table">
      <Header />
      <Body />
    </table>
  </div>
);

export default (initialData: TableStoreInitializer) => (
  <Table.Provider initialData={initialData}>
    <TableContent />
  </Table.Provider>
);
