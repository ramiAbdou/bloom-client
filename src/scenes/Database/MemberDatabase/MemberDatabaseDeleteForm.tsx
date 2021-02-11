import deline from 'deline';
import React from 'react';

import Row from '@containers/Row/Row';
import Form from '@organisms/Form/Form';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import FormHeader from '@organisms/Form/FormHeader';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import ModalCloseButton from '@organisms/Modal/ModalCloseButton';
import TableStore from '@organisms/Table/Table.store';
import { ToastOptions } from '@organisms/Toast/Toast.types';
import { IMember } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { DELETE_MEMBERS, MemberIdsArgs } from '../Database.gql';

const MemberDatabaseDeleteFormActions: React.FC = () => {
  return (
    <Row>
      <FormSubmitButton row loadingText="Removing...">
        Remove
      </FormSubmitButton>

      <ModalCloseButton />
    </Row>
  );
};

const MemberDatabaseDeleteForm: React.FC = () => {
  const addEntities = useStoreActions(({ db }) => db.addEntities);
  const deleteEntities = useStoreActions(({ db }) => db.deleteEntities);

  const memberIds = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const members: IMember[] = useStoreState(({ db }) => {
    return memberIds.map((memberId: string) => db.byMemberId[memberId]);
  });

  const onSubmit = async ({ closeModal, showToast }: OnFormSubmitArgs) => {
    deleteEntities({ ids: memberIds, table: 'members' });

    const options: ToastOptions<IMember, MemberIdsArgs> = {
      message: `${members?.length} member(s) removed from the community.`,
      mutationArgsOnComplete: {
        operation: 'deleteMembers',
        query: DELETE_MEMBERS,
        variables: { memberIds }
      },
      onUndo: () => addEntities({ entities: members, table: 'members' })
    };

    showToast(options);
    closeModal();
  };

  return (
    <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
      <FormHeader
        description={deline`
          Are you sure you want to remove these member(s)? They will no longer
          have access to your community and they will not show up in the member
          database.
        `}
        title={`Remove ${members?.length} member(s)?`}
      />

      <MemberDatabaseDeleteFormActions />
    </Form>
  );
};

export default MemberDatabaseDeleteForm;
