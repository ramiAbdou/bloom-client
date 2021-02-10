import deline from 'deline';
import React from 'react';

import Row from '@containers/Row/Row';
import useMutation from '@hooks/useMutation';
import Form from '@organisms/Form/Form';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import FormHeader from '@organisms/Form/FormHeader';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import ModalCloseButton from '@organisms/Modal/ModalCloseButton';
import TableStore from '@organisms/Table/Table.store';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MemberIdsArgs, PROMOTE_MEMBERS } from '../Database.gql';

const MemberDatabasePromoteFormActions: React.FC = () => {
  return (
    <Row spacing="xs">
      <FormSubmitButton row loadingText="Promoting...">
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

  const onSubmit = async ({
    closeModal,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
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

      <MemberDatabasePromoteFormActions />
    </Form>
  );
};

export default MemberDatabasePromoteForm;
