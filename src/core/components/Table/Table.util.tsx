/**
 * @fileoverview Utility: Table
 * @author Rami Abdou
 */

import React from 'react';
import { Column } from 'react-table';

import Checkbox from './components/Checkbox';

/**
 * Given a list of table columns, addSelectOption returns an updated column list
 * with the select checkbox at the beginning of that list. Different props
 * are passed in depending on if it's a Cell or Header element.
 */
export const addSelectOption = (columns: Column[]) => [
  {
    Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <Checkbox {...getToggleAllRowsSelectedProps()} />
    ),
    id: 'SELECTOR'
  },
  ...columns
];
