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
import { MutationEvent } from '@util/constants.events';
import { MemberIdsArgs } from '../Database.types';

const AdminDatabaseDemoteFormActions: React.FC = () => {
  return (
    <Row spacing="xs">
      <FormSubmitButton row loadingText="Demoting...">
        Demote
      </FormSubmitButton>

      <ModalCloseButton />
    </Row>
  );
};

const AdminDatabaseDemoteForm: React.FC = () => {
  const memberIds = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const [demoteMembers] = useMutation<IMember[], MemberIdsArgs>({
    fields: ['id', 'role'],
    operation: MutationEvent.DEMOTE_MEMBERS,
    schema: [Schema.MEMBER],
    types: { memberIds: { required: true, type: '[String!]' } }
  });

  const onSubmit = async ({ closeModal, showToast }: OnFormSubmitArgs) => {
    const { data } = await demoteMembers({ memberIds });

    if (data) {
      showToast({ message: `${memberIds.length} admin(s) demoted to member.` });
      closeModal();
    }
  };

  return (
    <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
      <FormHeader
        description="Are you sure you want to demote this admin to member? They will be lose all admin priviledges, but will remain in the community as a member. You can undo this action at any time."
        title="Demote to member?"
      />

      <AdminDatabaseDemoteFormActions />
    </Form>
  );
};

export default AdminDatabaseDemoteForm;
