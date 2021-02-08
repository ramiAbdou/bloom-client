import React from 'react';

import Button from '@atoms/Button/Button';
import TableStore from '@organisms/Table/Table.store';
import { ToastOptions } from '@organisms/Toast/Toast.types';
import { IMember } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { DELETE_MEMBERS, MemberIdsArgs } from '../Database.gql';

const MemberDatabaseDeleteModal: React.FC = () => {
  const addEntities = useStoreActions(({ db }) => db.addEntities);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const deleteEntities = useStoreActions(({ db }) => db.deleteEntities);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const memberIds = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const members: IMember[] = useStoreState(({ db }) => {
    return memberIds.map((memberId: string) => db.byMemberId[memberId]);
  });

  const onRemove = () => {
    deleteEntities({ ids: memberIds, table: 'members' });

    const options: ToastOptions<IMember, MemberIdsArgs> = {
      message: `${members?.length} member(s) removed from the community.`,
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
    <>
      <h1>Remove {members?.length} member(s)?</h1>
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
    </>
  );
};

export default MemberDatabaseDeleteModal;
