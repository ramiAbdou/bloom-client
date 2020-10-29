/**
 * @fileoverview Component: Checkbox
 * @author Rami Abdou
 */

import React from 'react';
import {
  TableToggleAllRowsSelectedProps,
  TableToggleRowsSelectedProps
} from 'react-table';

import { useStoreState } from '@store/Store';

export default ({
  checked,
  style,
  indeterminate: _,
  ...props
}: TableToggleRowsSelectedProps | TableToggleAllRowsSelectedProps) => {
  const primaryColor = useStoreState(
    ({ membership }) => membership.activeMembership.community.primaryColor
  );

  style = {
    ...style,
    ...(checked ? { backgroundColor: `${primaryColor}80` } : {})
  };

  return (
    <input
      className="c-table-select"
      style={style}
      type="checkbox"
      {...props}
    />
  );
};
