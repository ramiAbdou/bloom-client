/**
 * @fileoverview Scene: Action Row
 * @author Rami Abdou
 */

import React, { FC, memo } from 'react';
import { IoIosExit, IoMdFunnel } from 'react-icons/io';

import Button from '@components/Button/Button';
import ArrowUpCircle from '@components/Icons/ArrowUpCircle';
import Copy from '@components/Icons/Copy';
import Trash from '@components/Icons/Trash';
import Table from '@components/Table/Table.store';
import { Row } from '@components/Table/Table.types';
import { OnClickProps, ValueProps } from '@constants';

interface DatabaseActionProps extends OnClickProps, ValueProps {
  Component: FC;
  disabled?: boolean;
}

const DatabaseAction = memo(
  ({ Component, value, ...props }: DatabaseActionProps) => (
    <Button noHover className="s-database-action" value={value} {...props}>
      <Component />
    </Button>
  )
);

export const CopyEmailIcon = () => {
  const emails = Table.useStoreState(({ columns, data, selectedRowIds }) => {
    const columnId = columns.find(({ title }) => title === 'Email').id;
    return selectedRowIds.map(
      (rowId: string) => data.find((row: Row) => row.id === rowId)[columnId]
    );
  });

  const onClick = () => navigator.clipboard.writeText(emails.join(','));

  return (
    <DatabaseAction Component={Copy} value="Copy Email" onClick={onClick} />
  );
};

export const DeleteMemberIcon = () => (
  <DatabaseAction Component={Trash} value="Delete Member" />
);

export const ExportDataIcon = () => (
  <DatabaseAction Component={IoIosExit} value="Export Member Data" />
);

export const FilterIcon = () => (
  <DatabaseAction Component={IoMdFunnel} value="Filter" />
);

export const PromoteToAdminIcon = () => {
  const disabled = Table.useStoreState(
    (store) => store.selectedRowIds.length > 15
  );

  return (
    <DatabaseAction
      Component={ArrowUpCircle}
      disabled={disabled}
      value="Promote to Admin"
    />
  );
};
