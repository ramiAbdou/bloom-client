/**
 * @fileoverview Types: Table
 * @author Rami Abdou
 */

import {
  TableOptions,
  UseRowSelectInstanceProps,
  UseTableColumnOptions
} from 'react-table';

import { ClassNameProps } from '@constants';

export interface TableProps<T extends object = {}>
  extends TableOptions<T>,
    UseTableColumnOptions<T>,
    // UseRowSelectInstanceProps<T>,
    ClassNameProps {}
