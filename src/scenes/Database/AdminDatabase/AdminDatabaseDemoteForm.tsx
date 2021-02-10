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
import { DEMOTE_MEMBERS, MemberIdsArgs } from '../Database.gql';

const AdminDatabaseDemoteFormActions: React.FC = () => {
  return (
    <Row>
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
    name: 'demoteMembers',
    query: DEMOTE_MEMBERS,
    schema: [Schema.MEMBER]
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
        description={deline`
          Are you sure you want to demote this admin to member? They will be lose
          all admin priviledges, but will remain in the community as a member. You
          can undo this action at any time.
        `}
        title="Demote to member?"
      />

      <AdminDatabaseDemoteFormActions />
    </Form>
  );
};

export default AdminDatabaseDemoteForm;
