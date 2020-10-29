/**
 * @fileoverview Utility: Table
 * @author Rami Abdou
 */

import React from 'react';
import { CellProps, HeaderProps, Hooks } from 'react-table';

import Checkbox from './components/Checkbox';
import { TableInstance } from './Table.types';

/**
 * Given a list of table columns, addSelectOption returns an updated column list
 * with the select checkbox at the beginning of that list. Different props
 * are passed in depending on if it's a Cell or Header element.
 */
export const selectionHook = ({ allColumns }: Hooks<any>) =>
  allColumns.push((columns) => [
    {
      Cell: ({ row }) => (
        <Checkbox {...(row as any).getToggleRowSelectedProps()} />
      ),
      Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<any>) => (
        <Checkbox {...getToggleAllRowsSelectedProps()} />
      ),
      id: 'SELECTOR'
    },
    ...columns
  ]);
