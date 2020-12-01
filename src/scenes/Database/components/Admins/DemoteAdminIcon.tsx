/**
 * @fileoverview Component: PromoteToAdmin
 * @author Rami Abdou
 */

import { useMutation } from 'graphql-hooks';
import React from 'react';
import { useHistory } from 'react-router-dom';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import ArrowDownCircle from '@components/Icons/ArrowDownCircle';
import Modal from '@components/Modal/Modal';
import Table from '@components/Table/Table.store';
import { useStoreActions } from '@store/Store';
import { PROMOTE_TO_ADMIN } from '../../Database.gql';
import DatabaseAction from '../DatabaseAction';

const MODAL_ID = 'CONFIRM_PROMOTE_TO_ADMIN';

const PromoteToAdminModal = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const membershipIds = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );
  const numMembersPromoted = membershipIds.length;

  const { push } = useHistory();
  const [promoteToAdmin, { loading }] = useMutation(PROMOTE_TO_ADMIN);

  const onClose = () => {
    push('admins');
    showToast({
      message: `${numMembersPromoted} member(s) promoted to admin.`
    });
  };

  const onPromote = async () => {
    const { error } = await promoteToAdmin({ variables: { membershipIds } });
    if (!error) closeModal();
  };

  return (
    <Modal confirmation id={MODAL_ID} onClose={onClose}>
      <h1>Promote to admin?</h1>
      <p>
        Are you sure you want to promote this member to admin? They will be
        granted all admin priviledges. You can undo this action at any time.
      </p>
      <div>
        <PrimaryButton loading={loading} title="Promote" onClick={onPromote} />
        <OutlineButton title="Cancel" onClick={closeModal} />
      </div>
    </Modal>
  );
};

export default () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const disabled = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length > 15
  );
  const onClick = () => showModal({ id: MODAL_ID });

  return (
    <>
      <PromoteToAdminModal />
      <DatabaseAction
        Component={ArrowDownCircle}
        className="s-database-action--demote"
        disabled={disabled}
        value="Demote to Member"
        onClick={onClick}
      />
    </>
  );
};
