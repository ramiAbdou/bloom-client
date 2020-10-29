/**
 * @fileoverview Utility: Table
 * @author Rami Abdou
 */

import React from 'react';
import { Column } from 'react-table';

import Checkbox from './components/Checkbox';

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
