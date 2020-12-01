/**
 * @fileoverview Component: DemoteToAdmin
 * @author Rami Abdou
 */

import { useMutation } from 'graphql-hooks';
import React from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import ArrowDownCircle from '@components/Icons/ArrowDownCircle';
import Modal from '@components/Modal/Modal';
import Table from '@components/Table/Table.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { TOGGLE_ADMINS } from '../../Database.gql';
import DatabaseAction from '../DatabaseAction';

const MODAL_ID = 'DEMOTE_TO_MEMBER_CONFIRMATION';

const DemoteToMemberModal = () => {
  const admins = useStoreState(({ community }) => community.admins);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const updateCommunity = useStoreActions((actions) => actions.updateCommunity);
  const adminIds = Table.useStoreState(({ selectedRowIds }) => selectedRowIds);
  const numMembersDemoted = adminIds.length;

  const [toggleAdmin, { loading }] = useMutation(TOGGLE_ADMINS);

  const onDemote = async () => {
    const { error } = await toggleAdmin({
      variables: { membershipIds: adminIds }
    });

    if (error) return;

    // Filter the community members to NOT have the selected members.
    updateCommunity({
      admins: admins.filter((id: string) => !adminIds.includes(id))
    });

    showToast({
      message: `${numMembersDemoted} admin(s) demoted to member.`,
      type: 'PESSIMISTIC'
    });

    setTimeout(() => closeModal(), 0);
  };

  return (
    <Modal confirmation id={MODAL_ID}>
      <h1>Demote to member?</h1>
      <p>
        Are you sure you want to demote this admin to member? They will be lose
        all admin priviledges, but will remain in the community as a member. You
        can undo this action at any time.
      </p>
      <div>
        <PrimaryButton loading={loading} title="Demote" onClick={onDemote} />
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
      <DemoteToMemberModal />
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
