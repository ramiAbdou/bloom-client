/**
 * @fileoverview Scene: Action Row
 * @author Rami Abdou
 */

import React from 'react';
import { IoIosExit, IoMdFunnel } from 'react-icons/io';

import Button from '@components/Button/Button';
import ArrowUpCircle from '@components/Icons/ArrowUpCircle';
import Copy from '@components/Icons/Copy';
import Trash from '@components/Icons/Trash';
import Table from '@components/Table/Table.store';

export const CopyEmailIcon = () => (
  <Button noHover className="s-database-action" value="Copy Email">
    <Copy />
  </Button>
);

export const DeleteMemberIcon = () => (
  <Button noHover className="s-database-action" value="Delete Member">
    <Trash />
  </Button>
);

export const ExportDataIcon = () => (
  <Button noHover className="s-database-action" value="Export Member Data">
    <IoIosExit />
  </Button>
);

export const FilterIcon = () => (
  <Button noHover className="s-database-action" value="Filter">
    <IoMdFunnel />
  </Button>
);

export const PromoteToAdminIcon = () => {
  const disabled = Table.useStoreState(
    (store) => store.selectedRowIds.length > 15
  );

  console.log(disabled);

  return (
    <Button
      noHover
      className="s-database-action"
      disabled={disabled}
      value="Promote to Admin"
    >
      <ArrowUpCircle />
    </Button>
  );
};
