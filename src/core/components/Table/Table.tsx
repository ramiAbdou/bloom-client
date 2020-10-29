/**
 * @fileoverview Component: Table
 * @author Rami Abdou
 */

import './Table.scss';

import React from 'react';
import { Hooks, TableOptions, useRowSelect, useTable } from 'react-table';

import { ClassNameProps } from '@constants';
import CSSModifier from '@util/CSSModifier';
import DataRow from './components/DataRow';
import HeaderRow from './components/HeaderRow';
import { addSelectOption } from './Table.util';

interface TableProps extends TableOptions<{}>, ClassNameProps {}

export default ({ className, ...options }: TableProps) => {
  const table = useTable(options, useRowSelect, (hooks: Hooks) =>
    hooks.visibleColumns.push(addSelectOption)
  );

  const { css } = new CSSModifier()
    .class('c-table')
    .addClass(!!className, className);

  return (
    <div className="c-table-ctr">
      <table className={css}>
        <thead>
          {table.headerGroups.map((headerGroup) => (
            <HeaderRow key={headerGroup.id} {...headerGroup} />
          ))}
        </thead>

        <tbody>
          {table.rows.map((row) => {
            table.prepareRow(row);
            return <DataRow key={row.id} {...row} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
