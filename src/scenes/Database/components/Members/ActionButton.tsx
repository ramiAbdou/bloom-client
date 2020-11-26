/**
 * @fileoverview Scene: Action Row
 * @author Rami Abdou
 */

import { useMutation } from 'graphql-hooks';
import React, { FC, memo } from 'react';
import { IoIosExit, IoMdFunnel } from 'react-icons/io';
import { useHistory } from 'react-router-dom';

import Button from '@components/Button/Button';
import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import ArrowUpCircle from '@components/Icons/ArrowUpCircle';
import Copy from '@components/Icons/Copy';
import Trash from '@components/Icons/Trash';
import Modal from '@components/Modal/Modal';
import Table from '@components/Table/Table.store';
import { Row } from '@components/Table/Table.types';
import { LoadingProps, OnClickProps } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import { DELETE_MEMBERSHIPS, PROMOTE_TO_ADMIN } from '../../Database.gql';

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
  const members = useStoreState((store) => store.community.members);
  const updateCommunity = useStoreActions((actions) => actions.updateCommunity);
  const membershipIds = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const [deleteMemberships] = useMutation(DELETE_MEMBERSHIPS);

  const onClick = async () => {
    const { data } = await deleteMemberships({ variables: { membershipIds } });
    if (!data?.deleteMemberships) return;

    updateCommunity({
      members: members.filter(
        (memberId: string) => !membershipIds.includes(memberId)
      )
    });
  };

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
  const membershipIds = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );
  const disabled = Table.useStoreState(
    (store) => store.selectedRowIds.length > 15
  );
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const setOnClose = useStoreActions(({ modal }) => modal.setOnClose);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const { push } = useHistory();
  const [promoteToAdmin, { loading }] = useMutation(PROMOTE_TO_ADMIN);

  const MODAL_ID = 'CONFIRM_PROMOTE_TO_ADMIN';

  const goToAdmins = () => push('admins');

  const onPromote = async () => {
    setOnClose(goToAdmins);
    const { data } = await promoteToAdmin({ variables: { membershipIds } });
    if (!data?.promoteToAdmin) return;
    closeModal();
  };

  const onClick = () => showModal({ id: MODAL_ID });

  return (
    <>
      <Modal confirmation id={MODAL_ID}>
        <h1>Promote to admin?</h1>
        <p>
          Are you sure you want to promote this member to admin? They will be
          granted all admin priviledges. You can undo this action at any time.
        </p>
        <div>
          <PrimaryButton
            loading={loading}
            title="Promote"
            onClick={onPromote}
          />
          <OutlineButton title="Cancel" onClick={closeModal} />
        </div>
      </Modal>

      <DatabaseAction
        Component={ArrowUpCircle}
        disabled={disabled}
        value="Promote to Admin"
        onClick={onClick}
      />
    </>
  );
};
