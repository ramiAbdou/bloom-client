/**
 * @fileoverview Component: Table
 * @author Rami Abdou
 */

import './Table.scss';

import React from 'react';
import {
  Hooks,
  TableOptions,
  useRowSelect,
  useTable,
  UseTableInstanceProps
} from 'react-table';

import { ClassNameProps } from '@constants';
import CSSModifier from '@util/CSSModifier';
import DataRow from './components/DataRow';
import HeaderRow from './components/HeaderRow';
import { addSelectOption } from './Table.util';

interface TableProps extends TableOptions<{}>, ClassNameProps {}

export default ({ className, ...options }: TableProps) => {
  const hooks = [useRowSelect];

  const {
    headerGroups,
    prepareRow,
    rows
  }: UseTableInstanceProps<{}> = useTable(
    options,
    ...hooks,
    ({ visibleColumns }: Hooks) => visibleColumns.push(addSelectOption)
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
};
