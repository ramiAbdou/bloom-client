import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import Modal from '@organisms/Modal/Modal';
import Table from '@organisms/Table/Table.store';
import { IMember } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { ToastOptions } from '../../../components/organisms/Toast/Toast.types';
import { DELETE_MEMBERS, DeleteMembersArgs } from '../Database.gql';

const MemberDatabaseDeleteModal: React.FC = () => {
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

export default MemberDatabaseDeleteModal;