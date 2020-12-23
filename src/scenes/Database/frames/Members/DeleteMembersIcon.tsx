import React from 'react';
import { IoTrash } from 'react-icons/io5';

import Button from '@components/Button/Button';
import Modal from '@components/Modal/Modal';
import Table from '@components/Table/Table.store';
import { ModalType } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import DatabaseAction from '../../components/DatabaseAction';
import { DELETE_MEMBERS } from '../../Database.gql';

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
      members: members.filter((id: string) => !memberIds.includes(id))
    });

    // After the toast finishes showing, we call the mutation that actually
    // deletes the members from the community. We supply an undo function
    // that resets the members.
    showToast({
      message: `${numMembers} member(s) removed from the community.`,
      mutationOptionsOnClose: [DELETE_MEMBERS, { variables: { memberIds } }],
      onUndo: () => updateCommunity({ members: allMembers }),
      type: 'PESSIMISTIC',
      undo: true
    });

    setTimeout(closeModal, 0);
  };

  return (
    <Modal confirmation id={ModalType.DELETE_MEMBERS}>
      <h1>Remove {numMembers} member(s)?</h1>
      <p>
        Are you sure you want to remove these member(s)? They will no longer
        have access to your community and they will not show up in the member
        database.
      </p>
      <div>
        <Button primary onClick={onRemove}>
          Remove
        </Button>
        <Button outline onClick={() => closeModal()}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default () => {
  const isOwner = useStoreState(({ db }) => db.isOwner);
  const memberId = useStoreState(({ db }) => db.member.id);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const selectedRowIds = Table.useStoreState((store) => store.selectedRowIds);

  const notEnoughPermissions: boolean = useStoreState(({ db }) => {
    if (isOwner) return false;
    const { allIds, byId } = db.entities.members;
    const adminIds = allIds.filter((id: string) => !!byId[id].role);
    if (selectedRowIds.some((id: string) => adminIds.includes(id))) return true;
    return false;
  });

  const selectedSelf: boolean = selectedRowIds.includes(memberId);

  const tooltip: string = takeFirst([
    [selectedSelf, `Can't delete member(s) because you selected yourself.`],
    [
      notEnoughPermissions,
      `You don't have the permissions to delete other admins.`
    ],
    'Delete Member(s)'
  ]);

  const onClick = () => showModal(ModalType.DELETE_MEMBERS);

  return (
    <>
      <DeleteMembersModal />
      <DatabaseAction
        Icon={IoTrash}
        className="s-database-action--delete"
        disabled={selectedSelf || notEnoughPermissions}
        tooltip={tooltip}
        onClick={onClick}
      />
    </>
  );
};
