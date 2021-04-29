import React from 'react';
import { showToast } from 'src/App.reactive';

import { DocumentNode, gql, useMutation } from '@apollo/client';
import Form, {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form';
import FormHeader from '@components/organisms/Form/FormHeader';
import Modal from '@components/organisms/Modal/Modal';
import { closeModal, modalVar } from '@components/organisms/Modal/Modal.state';
import ModalConfirmationActionRow from '@components/organisms/Modal/ModalConfirmationActionRow';
import { TableStateAndDispatch } from '@components/organisms/Table/Table.types';
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
    formDispatch
  }: OnFormSubmitArgs) => {
    const { tableDispatch, tableState }: TableStateAndDispatch = modalVar()
      ?.metadata as TableStateAndDispatch;

    const memberIds: string[] = tableState.selectedRowIds;

    try {
      await deleteMembers({ variables: { deletedAt: now(), memberIds } });
      closeModal();
      showToast({ message: `${memberIds.length} member(s) removed.` });
      tableDispatch({ type: 'RESET_SELECTED_ROW_IDS' });
    } catch {
      formDispatch({
        error: 'Failed to remove member(s). Please try again later.',
        type: 'SET_ERROR'
      });
    }
  };

  return (
    <Modal>
      <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
        <DatabaseDeleteMemberModalFormHeader />

        <ModalConfirmationActionRow
          primaryLoadingText="Removing..."
          primaryText="Remove"
        />
      </Form>
    </Modal>
  );
};

export default DatabaseDeleteMemberModalForm;
