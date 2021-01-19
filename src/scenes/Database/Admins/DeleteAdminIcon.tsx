import React from 'react';
import { IoTrash } from 'react-icons/io5';

import Button from '@atoms/Button';
import { ModalType } from '@constants';
import Modal from '@organisms/Modal/Modal';
import Table from '@organisms/Table/Table.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { DELETE_MEMBERS } from '../Database.gql';
import DatabaseAction from '../DatabaseAction';

const DeleteMembersModal = () => {
  const members = useStoreState(({ db }) => db.community.members);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const updateCommunity = useStoreActions(({ db }) => db.updateCommunity);
  const memberIds = Table.useStoreState(({ selectedRowIds }) => selectedRowIds);

  const numMembers = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length
  );

  const onRemove = () => {
    const allMembers = members;

    // Filter the community members to NOT have the selected members.
    updateCommunity({
      members: members?.filter((id: string) => !memberIds.includes(id))
    });

    // After the toast finishes showing, we call the mutation that actually
    // deletes the members from the community. We supply an undo function
    // that resets the members.
    showToast({
      message: `${numMembers} admin(s) removed from the community.`,
      mutationOptionsOnClose: [DELETE_MEMBERS, { variables: { memberIds } }],
      onUndo: () => updateCommunity({ members: allMembers })
    });

    setTimeout(closeModal, 0);
  };

  return (
    <Modal id={ModalType.DELETE_ADMINS} options={{ confirmation: true }}>
      <h1>Remove admin(s)?</h1>

      <p>
        Are you sure you want to remove these admin(s)? They will no longer have
        access to your community and they will not show up in the member
        database.
      </p>

      <div>
        <Button primary onClick={onRemove}>
          Remove
        </Button>
        <Button secondary onClick={() => closeModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal(ModalType.DELETE_ADMINS);

  return (
    <>
      <DeleteMembersModal />
      <DatabaseAction
        Icon={IoTrash}
        className="s-database-action--delete"
        tooltip="Delete Admin"
        onClick={onClick}
      />
    </>
  );
};
