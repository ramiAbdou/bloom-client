/**
 * @fileoverview Scene: Action Row
 * @author Rami Abdou
 */

import React from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import Trash from '@components/Icons/Trash';
import Modal from '@components/Modal/Modal';
import Table from '@components/Table/Table.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { DELETE_MEMBERSHIPS } from '../../Database.gql';
import DatabaseAction from './DatabaseAction';

const MODAL_ID = 'DELETE_MEMBERS';

const DeleteMembersModal = () => {
  const members = useStoreState(({ community }) => community.members);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const updateCommunity = useStoreActions((actions) => actions.updateCommunity);
  const membershipIds = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const onDelete = async () => {
    const allMembers = members;

    closeModal(() => {
      updateCommunity({
        members: members.filter(
          (memberId: string) => !membershipIds.includes(memberId)
        )
      });

      showToast({
        message: 'Member(s) removed from the community.',
        mutationOptionsOnClose: [
          DELETE_MEMBERSHIPS,
          { variables: { membershipIds } }
        ],
        onUndo: () => updateCommunity({ members: allMembers }),
        type: 'PESSIMISTIC',
        undo: true
      });
    });
  };

  return (
    <Modal confirmation id={MODAL_ID}>
      <h1>Remove member(s)?</h1>
      <p>
        Are you sure you want to remove these member(s)? They will no longer
        have access to your community and they will not show up in the member
        database.
      </p>
      <div>
        <PrimaryButton title="Remove" onClick={onDelete} />
        <OutlineButton title="Cancel" onClick={closeModal} />
      </div>
    </Modal>
  );
};

export default () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal({ id: MODAL_ID });

  return (
    <>
      <DeleteMembersModal />
      <DatabaseAction
        Component={Trash}
        className="s-database-action--delete"
        value="Delete Member"
        onClick={onClick}
      />
    </>
  );
};
