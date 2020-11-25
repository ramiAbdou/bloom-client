/**
 * @fileoverview Scene: Action Row
 * @author Rami Abdou
 */

import { useMutation } from 'graphql-hooks';
import React, { FC, memo } from 'react';
import { IoIosExit, IoMdFunnel } from 'react-icons/io';

import Button from '@components/Button/Button';
import ArrowUpCircle from '@components/Icons/ArrowUpCircle';
import Copy from '@components/Icons/Copy';
import Trash from '@components/Icons/Trash';
import Table from '@components/Table/Table.store';
import { Row } from '@components/Table/Table.types';
import { LoadingProps, OnClickProps } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import { DELETE_MEMBERSHIPS } from '../../Database.gql';

interface DatabaseActionProps extends Partial<LoadingProps>, OnClickProps {
  Component: FC;
  disabled?: boolean;
  value?: string;
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
    return selectedRowIds.map((rowId: string) => {
      const selectedRow = data.find((row: Row) => row.id === rowId) || {};
      return selectedRow?.[columnId];
    });
  });

  const onClick = () => navigator.clipboard.writeText(emails.join(','));

  return (
    <DatabaseAction Component={Copy} value="Copy Email" onClick={onClick} />
  );
};

export const DeleteMemberIcon = () => {
  const community = useStoreState((store) => store.community);
  const communities = useStoreState(({ entities }) => entities.communities);
  const updateEntities = useStoreActions((actions) => actions.updateEntities);
  const membershipIds = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );
  const clearSelectedRows = Table.useStoreActions(
    (store) => store.clearSelectedRows
  );

  const [deleteMemberships] = useMutation(DELETE_MEMBERSHIPS);

  const onClick = async () => {
    const { id, members } = community;

    const { data } = await deleteMemberships({ variables: { membershipIds } });
    if (!data?.deleteMemberships) return;

    updateEntities({
      updatedState: {
        communities: {
          ...communities,
          byId: {
            ...communities.byId,
            [id]: {
              ...community,
              members: members.filter(
                (memberId: string) => !membershipIds.includes(memberId)
              )
            }
          }
        }
      }
    });

    clearSelectedRows();
  };

  // DELETE_MEMBERSHIPS
  return (
    <DatabaseAction Component={Trash} value="Delete Member" onClick={onClick} />
  );
};

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
