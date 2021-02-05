import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import Row from '@containers/Row/Row';
import useMutation from '@hooks/useMutation';
import Modal from '@organisms/Modal/Modal';
import TableStore from '@organisms/Table/Table.store';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import { MemberIdsArgs, PROMOTE_MEMBERS } from '../Database.gql';

const MemberDatabasePromoteActions: React.FC = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const memberIds = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const clearSelectedRows = TableStore.useStoreActions(
    (store) => store.clearSelectedRows
  );

  const [promoteMembers, { loading }] = useMutation<IMember[], MemberIdsArgs>({
    name: 'promoteMembers',
    query: PROMOTE_MEMBERS,
    schema: [Schema.MEMBER]
  });

  const onPromote = async () => {
    const { error } = await promoteMembers({ memberIds });
    if (error) return;
    clearSelectedRows();
    showToast({ message: `${memberIds.length} member(s) promoted to admin.` });
    closeModal();
  };

  return (
    <Row spacing="xs">
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
    </Row>
  );
};

const MemberDatabasePromoteModal: React.FC = () => {
  return (
    <Modal id={ModalType.PROMOTE_TO_ADMIN} options={{ confirmation: true }}>
      <h1>Promote to admin?</h1>

      <p>
        Are you sure you want to promote this member to admin? They will be
        granted all admin priviledges. You can undo this action at any time.
      </p>

      <MemberDatabasePromoteActions />
    </Modal>
  );
};

export default MemberDatabasePromoteModal;
