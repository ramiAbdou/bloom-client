import React from 'react';

import { IMember } from '@db/db.entities';
import useBloomMutation from '@gql/hooks/useBloomMutation';
import Form from '@organisms/Form/Form';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import FormHeader from '@organisms/Form/FormHeader';
import ModalConfirmationActions from '@organisms/Modal/ModalConfirmationActions';
import TableStore from '@organisms/Table/Table.store';
import { MutationEvent } from '@util/constants.events';
import { MemberIdsArgs } from '../Database.types';

const AdminDatabaseDemoteForm: React.FC = () => {
  const memberIds = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const [demoteMembers] = useBloomMutation<IMember[], MemberIdsArgs>({
    fields: ['id', 'role'],
    operation: MutationEvent.DEMOTE_MEMBERS,
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

      <ModalConfirmationActions
        primaryLoadingText="Demoting..."
        primaryText="Demote"
      />
    </Form>
  );
};

export default AdminDatabaseDemoteForm;
