import React from 'react';

import Form from '@components/organisms/Form/Form';
import { OnFormSubmitArgs } from '@components/organisms/Form/Form.types';
import FormHeader from '@components/organisms/Form/FormHeader';
import ModalConfirmationActions from '@components/organisms/Modal/ModalConfirmationActions';
import TableStore from '@components/organisms/Table/Table.store';
import { IMember } from '@core/db/db.entities';
import useBloomMutation from '@gql/hooks/useBloomMutation';
import { MutationEvent } from '@util/constants.events';
import { MemberIdsArgs } from '../Database.types';

const MemberDatabasePromoteForm: React.FC = () => {
  const memberIds = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const clearSelectedRows = TableStore.useStoreActions(
    (state) => state.clearSelectedRows
  );

  const [promoteMembers] = useBloomMutation<IMember[], MemberIdsArgs>({
    fields: ['id', 'role'],
    operation: MutationEvent.PROMOTE_MEMBERS,
    types: { memberIds: { required: true, type: '[String!]' } }
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

    closeModal();
    showToast({ message: `${memberIds.length} member(s) promoted to admin.` });
    clearSelectedRows();
  };

  return (
    <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
      <FormHeader
        description="Are you sure you want to promote this member to admin? They will be granted all admin priviledges. You can undo this action at any time."
        title="Promote to admin?"
      />

      <ModalConfirmationActions
        primaryLoadingText="Promoting..."
        primaryText="Promote"
      />
    </Form>
  );
};

export default MemberDatabasePromoteForm;
