/**
 * @fileoverview Component: Table
 * @author Rami Abdou
 */

import './Table.scss';

import React from 'react';
import { Hooks, useRowSelect, useTable } from 'react-table';

import CSSModifier from '@util/CSSModifier';
import DataRow from './components/DataRow';
import HeaderRow from './components/HeaderRow';
import { TableProps } from './Table.types';
import { addSelectOption } from './Table.util';

export default function Table<T extends object>({
  className,
  columns,
  ...props
}: TableProps) {
  // List of customizable plugins that we want to use in our table.
  const hooks = [useRowSelect];

  const { headerGroups, prepareRow, rows } = useTable<T>(
    { ...props, columns },
    ...hooks
    // ({ visibleColumns }: Hooks) => visibleColumns.push(addSelectOption)
  );

  const { css } = new CSSModifier()
    .class('c-table')
    .addClass(!!className, className);

  return (
    <div className="c-table-ctr">
      <table className={css}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <HeaderRow key={headerGroup.id} {...headerGroup} />
          ))}
        </thead>

        <tbody>
          {rows.map((row) => {
            prepareRow(row);
            return <DataRow key={row.id} {...row} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
