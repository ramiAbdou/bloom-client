/**
 * @fileoverview Scene: Action Row
 * @author Rami Abdou
 */

import React, { useState } from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import Trash from '@components/Icons/Trash';
import Modal from '@components/Modal/Modal';
import Table from '@components/Table/Table.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { DELETE_MEMBERSHIPS } from '../../Database.gql';
import DatabaseAction from '../DatabaseAction';

const MODAL_ID = 'DELETE_ADMINS';

const DeleteMembersModal = () => {
  const [shouldSetOnClose, setShouldSetOnClose] = useState(false);

  const admins = useStoreState(({ community }) => community.admins);
  const members = useStoreState(({ community }) => community.members);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const updateCommunity = useStoreActions((actions) => actions.updateCommunity);
  const adminIds = Table.useStoreState(({ selectedRowIds }) => selectedRowIds);
  const numMembers = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length
  );

  const onClose = () => {
    // shouldSetOnClose will only be true if we clicked the remove button.
    if (!shouldSetOnClose) return;

    const allAdmins = admins;
    const allMembers = members;

    // Filter the community members to NOT have the selected members.
    updateCommunity({
      admins: admins.filter((id: string) => !adminIds.includes(id)),
      members: members?.filter((id: string) => !adminIds.includes(id))
    });

    // After the toast finishes showing, we call the mutation that actually
    // deletes the members from the community. We supply an undo function
    // that resets the members.
    showToast({
      message: `${numMembers} admin(s) removed from the community.`,
      mutationOptionsOnClose: [
        DELETE_MEMBERSHIPS,
        { variables: { membershipIds: adminIds } }
      ],
      onUndo: () => updateCommunity({ admins: allAdmins, members: allMembers }),
      type: 'PESSIMISTIC',
      undo: true
    });
  };

  const onRemove = () => {
    setShouldSetOnClose(true);
    setTimeout(closeModal, 0);
  };

  return (
    <Modal
      confirmation
      id={MODAL_ID}
      onClose={onClose}
      onCloseDeps={[shouldSetOnClose]}
    >
      <h1>Remove admin(s)?</h1>
      <p>
        Are you sure you want to remove these member(s)? They will no longer
        have access to your community and they will not show up in the member
        database.
      </p>
      <div>
        <PrimaryButton title="Remove" onClick={onRemove} />
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
        value="Delete Admin"
        onClick={onClick}
      />
    </>
  );
};
