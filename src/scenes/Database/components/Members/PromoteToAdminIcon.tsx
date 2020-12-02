/**
 * @fileoverview Component: PromoteToAdmin
 * @author Rami Abdou
 */

import { useMutation } from 'graphql-hooks';
import React from 'react';
import { IoArrowUpCircle } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import Modal from '@components/Modal/Modal';
import Table from '@components/Table/Table.store';
import { useStoreActions } from '@store/Store';
import { TOGGLE_ADMINS } from '../../Database.gql';
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
  const [toggleAdmin, { loading }] = useMutation(TOGGLE_ADMINS);

  const onPromote = async () => {
    const { error } = await toggleAdmin({ variables: { membershipIds } });
    if (error) return;
    showToast({
      message: `${numMembersPromoted} member(s) promoted to admin.`
    });

    setTimeout(closeModal, 0);
  };

  return (
    <Modal confirmation id={MODAL_ID} onClose={() => push('admins')}>
      <h1>Promote to admin?</h1>
      <p>
        Are you sure you want to promote this member to admin? They will be
        granted all admin priviledges. You can undo this action at any time.
      </p>
      <div>
        <PrimaryButton
          loading={loading}
          loadingText="Promoting..."
          title="Promote"
          onClick={onPromote}
        />
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

  const onClick = () => showModal(MODAL_ID);

  let tooltip: string;

  if (!disabled) tooltip = `Promote to Admin(s)`;
  else if (disabled) tooltip = `Can only promote 15 members admins at a time.`;

  return (
    <>
      <PromoteToAdminModal />
      <DatabaseAction
        Component={IoArrowUpCircle}
        className="s-database-action--promote"
        disabled={disabled}
        value={tooltip}
        onClick={onClick}
      />
    </>
  );
};
