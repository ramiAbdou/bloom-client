import React from 'react';
import { showToast } from 'src/App.reactive';

import { DocumentNode, gql, useMutation } from '@apollo/client';
import Form from '@components/organisms/Form/Form';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import FormHeader from '@components/organisms/Form/FormHeader';
import ModalConfirmationActions from '@components/organisms/Modal/ModalConfirmationActions';
import { TableStateAndDispatch } from '@components/organisms/Table/Table.types';
import { modalVar } from '@core/state/Modal.state';
import { now } from '@util/util';

interface DeleteMembersArgs {
  deletedAt: string;
  memberIds: string[];
}

const DELETE_MEMBERS: DocumentNode = gql`
  mutation DeleteMembers($memberIds: [String!]!, $deletedAt: String!) {
    updateMembers(
      where: { id: { _in: $memberIds } }
      _set: { deletedAt: $deletedAt }
    ) {
      returning {
        deletedAt
        id
      }
    }
  }
`;

const DatabaseDeleteMemberModalFormHeader: React.FC = () => {
  const { tableState }: TableStateAndDispatch = modalVar()
    ?.metadata as TableStateAndDispatch;

  const membersCount: number = tableState.selectedRowIds?.length;
  const title: string = `Remove ${membersCount} member(s)?`;

  const description: string =
    'Are you sure you want to remove these member(s)? They will no longer have access to your community and they will not show up in the member database.';

  return <FormHeader description={description} title={title} />;
};

const DatabaseDeleteMemberModalForm: React.FC = () => {
  const [deleteMembers] = useMutation<unknown, DeleteMembersArgs>(
    DELETE_MEMBERS
  );

  const onSubmit: OnFormSubmitFunction = async ({
    setError
  }: OnFormSubmitArgs) => {
    const { tableDispatch, tableState }: TableStateAndDispatch = modalVar()
      ?.metadata as TableStateAndDispatch;

    const memberIds: string[] = tableState.selectedRowIds;

    try {
      await deleteMembers({ variables: { deletedAt: now(), memberIds } });
      modalVar(null);
      showToast({ message: `${memberIds.length} member(s) removed.` });
      tableDispatch({ type: 'RESET_SELECTED_ROW_IDS' });
    } catch {
      setError('Failed to remove member(s). Please try again later.');
    }
  };

  return (
    <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
      <DatabaseDeleteMemberModalFormHeader />

      <ModalConfirmationActions
        primaryLoadingText="Removing..."
        primaryText="Remove"
      />
    </Form>
  );
};

export default DatabaseDeleteMemberModalForm;
