import React from 'react';
import { IoTrash } from 'react-icons/io5';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import Modal from '@components/Modal/Modal';
import Table from '@components/Table/Table.store';
import { ModalType } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import { DELETE_MEMBERSHIPS } from '../../Database.gql';
import DatabaseAction from '../DatabaseAction';

const DeleteMembersModal = () => {
  const memberships = useStoreState(({ community }) => community.memberships);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const updateCommunity = useStoreActions((store) => store.updateCommunity);

  const membershipIds = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const numMembers = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length
  );

  const onRemove = () => {
    const allMemberships = memberships;

    // Filter the community members to NOT have the selected members.
    updateCommunity({
      memberships: memberships?.filter(
        (id: string) => !membershipIds.includes(id)
      )
    });

    // After the toast finishes showing, we call the mutation that actually
    // deletes the members from the community. We supply an undo function
    // that resets the members.
    showToast({
      message: `${numMembers} admin(s) removed from the community.`,
      mutationOptionsOnClose: [
        DELETE_MEMBERSHIPS,
        { variables: { membershipIds } }
      ],
      onUndo: () => updateCommunity({ memberships: allMemberships }),
      type: 'PESSIMISTIC',
      undo: true
    });

    setTimeout(closeModal, 0);
  };

  return (
    <Modal confirmation id={ModalType.DELETE_ADMINS}>
      <h1>Remove admin(s)?</h1>

      <p>
        Are you sure you want to remove these admin(s)? They will no longer have
        access to your community and they will not show up in the member
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
  const onClick = () => showModal(ModalType.DELETE_ADMINS);

  return (
    <>
      <DeleteMembersModal />
      <DatabaseAction
        Icon={IoTrash}
        className="s-database-action--delete"
        value="Delete Admin"
        onClick={onClick}
      />
    </>
  );
};
