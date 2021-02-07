import deline from 'deline';
import React from 'react';

import { ModalType } from '@constants';
import Row from '@containers/Row/Row';
import useMutation from '@hooks/useMutation';
import Form from '@organisms/Form/Form';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import FormHeader from '@organisms/Form/FormHeader';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import Modal from '@organisms/Modal/Modal';
import ModalCloseButton from '@organisms/Modal/ModalCloseButton';
import TableStore from '@organisms/Table/Table.store';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MemberIdsArgs, PROMOTE_MEMBERS } from '../Database.gql';

const MemberDatabasePromoteActions: React.FC = () => {
  return (
    <Row spacing="xs">
      <FormSubmitButton
        fill={false}
        large={false}
        loadingText="Promoting..."
        showError={false}
      >
        Promote
      </FormSubmitButton>

      <ModalCloseButton />
    </Row>
  );
};

const MemberDatabasePromoteForm: React.FC = () => {
  const memberIds = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const clearSelectedRows = TableStore.useStoreActions(
    (store) => store.clearSelectedRows
  );

  const [promoteMembers] = useMutation<IMember[], MemberIdsArgs>({
    name: 'promoteMembers',
    query: PROMOTE_MEMBERS,
    schema: [Schema.MEMBER]
  });

  const onSubmit = async ({ actions, setError }: OnFormSubmitArgs) => {
    const { closeModal } = actions.modal;
    const { showToast } = actions.toast;

    const { error } = await promoteMembers({ memberIds });

    if (error) {
      setError(error);
      return;
    }

    clearSelectedRows();
    showToast({ message: `${memberIds.length} member(s) promoted to admin.` });
    closeModal();
  };

  return (
    <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
      <FormHeader
        description={deline`
          Are you sure you want to promote this member to admin? They will be
          granted all admin priviledges. You can undo this action at any time.
        `}
        title="Promote to admin?"
      />

      <MemberDatabasePromoteActions />
    </Form>
  );
};

const MemberDatabasePromoteModal: React.FC = () => {
  return (
    <Modal id={ModalType.PROMOTE_TO_ADMIN} options={{ confirmation: true }}>
      <MemberDatabasePromoteForm />
    </Modal>
  );
};

export default MemberDatabasePromoteModal;
