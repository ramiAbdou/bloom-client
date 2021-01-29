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
import { PROMOTE_TO_ADMIN, PromoteToAdminArgs } from '../Database.gql';

const MemberDatabasePromoteModal: React.FC = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const memberIds = Table.useStoreState(({ selectedRowIds }) => selectedRowIds);

  const { push } = useHistory();

  const [promoteToAdmin, { loading }] = useMutation<
    IMember[],
    PromoteToAdminArgs
  >({
    name: 'promoteToAdmin',
    query: PROMOTE_TO_ADMIN
  });

  const onPromote = async () => {
    const { data } = await promoteToAdmin({ memberIds });
    if (!data) return;

    mergeEntities({ data, schema: [Schema.MEMBER] });

    showToast({
      message: `${memberIds.length} member(s) promoted to admin.`
    });

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
