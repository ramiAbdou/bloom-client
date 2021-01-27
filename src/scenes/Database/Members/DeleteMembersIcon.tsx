import React from 'react';
import { IoTrash } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import Modal from '@organisms/Modal/Modal';
import Table from '@organisms/Table/Table.store';
import { IMember } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import { ToastOptions } from '../../../components/organisms/Toast/Toast.types';
import { DELETE_MEMBERS, DeleteMembersArgs } from '../Database.gql';
import DatabaseAction from '../DatabaseAction';

const DeleteMembersModal = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const addEntities = useStoreActions(({ db }) => db.addEntities);
  const deleteEntities = useStoreActions(({ db }) => db.deleteEntities);

  const memberIds = Table.useStoreState(({ selectedRowIds }) => selectedRowIds);

  const numMembers = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length
  );

  const members: IMember[] = useStoreState(({ db }) => {
    const { byId: byMemberId } = db.entities.members;
    return memberIds.map((memberId: string) => byMemberId[memberId]);
  });

  const onRemove = () => {
    deleteEntities({ ids: memberIds, table: 'members' });

    const options: ToastOptions<IMember, DeleteMembersArgs> = {
      message: `${numMembers} member(s) removed from the community.`,
      mutationArgsOnComplete: {
        name: 'deleteMembers',
        query: DELETE_MEMBERS,
        variables: { memberIds }
      },
      onUndo: () => addEntities({ entities: members, table: 'members' })
    };

    showToast(options);
    closeModal();
  };

  return (
    <Modal id={ModalType.DELETE_MEMBERS} options={{ confirmation: true }}>
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
        <Button secondary onClick={() => closeModal()}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default () => {
  const isOwner = useStoreState(({ db }) => db.member?.role === 'OWNER');
  const memberId = useStoreState(({ db }) => db.member.id);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const selectedRowIds = Table.useStoreState((store) => store.selectedRowIds);

  const notEnoughPermissions: boolean = useStoreState(({ db }) => {
    if (isOwner) return false;
    const { byId } = db.entities.members;

    const adminIds = db.community.members.filter(
      (id: string) => !!byId[id].role
    );

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
