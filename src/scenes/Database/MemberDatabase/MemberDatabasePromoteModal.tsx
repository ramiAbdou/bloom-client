import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import useMutation from '@hooks/useMutation';
import Modal from '@organisms/Modal/Modal';
import Table from '@organisms/Table/Table.store';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import { MemberIdsArgs, PROMOTE_MEMBERS } from '../Database.gql';

const MemberDatabasePromoteModal: React.FC = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const memberIds = Table.useStoreState(({ selectedRowIds }) => selectedRowIds);

  const { push } = useHistory();

  const [promoteMembers, { loading }] = useMutation<IMember[], MemberIdsArgs>({
    name: 'promoteMembers',
    query: PROMOTE_MEMBERS,
    schema: [Schema.MEMBER]
  });

  const onPromote = async () => {
    const { error } = await promoteMembers({ memberIds });
    if (error) return;
    showToast({ message: `${memberIds.length} member(s) promoted to admin.` });
    setTimeout(closeModal, 0);
  };

  const onClose = () => push('admins');

  return (
    <Modal
      id={ModalType.PROMOTE_TO_ADMIN}
      options={{ confirmation: true }}
      onClose={onClose}
    >
      <h1>Promote to admin?</h1>

      <p>
        Are you sure you want to promote this member to admin? They will be
        granted all admin priviledges. You can undo this action at any time.
      </p>

      <div>
        <Button
          primary
          loading={loading}
          loadingText="Promoting..."
          onClick={onPromote}
        >
          Promote
        </Button>
        <Button secondary onClick={() => closeModal()}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default MemberDatabasePromoteModal;
