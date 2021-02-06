import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import useMutation from '@hooks/useMutation';
import Modal from '@organisms/Modal/Modal';
import TableStore from '@organisms/Table/Table.store';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import { DEMOTE_MEMBERS, MemberIdsArgs } from '../Database.gql';

const AdminDatabaseDemoteModal: React.FC = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const memberIds = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const [demoteMembers, { loading }] = useMutation<IMember[], MemberIdsArgs>({
    name: 'demoteMembers',
    query: DEMOTE_MEMBERS,
    schema: [Schema.MEMBER]
  });

  const onPrimaryClick = async () => {
    const { data } = await demoteMembers({ memberIds });

    if (data) {
      showToast({ message: `${memberIds.length} admin(s) demoted to member.` });
      closeModal();
    }
  };

  const onSecondaryClick = () => closeModal();

  return (
    <Modal id={ModalType.DEMOTE_MEMBERS} options={{ confirmation: true }}>
      <h1>Demote to member?</h1>

      <p>
        Are you sure you want to demote this admin to member? They will be lose
        all admin priviledges, but will remain in the community as a member. You
        can undo this action at any time.
      </p>

      <div>
        <Button primary loading={loading} onClick={onPrimaryClick}>
          Demote
        </Button>

        <Button secondary onClick={onSecondaryClick}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default AdminDatabaseDemoteModal;
