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

interface DemoteMembersArgs {
  memberIds: string[];
}

const DEMOTE_MEMBERS: DocumentNode = gql`
  mutation DemoteMembers($memberIds: [String!]!) {
    updateMembers(where: { id: { _in: $memberIds } }, _set: { role: null }) {
      returning {
        id
        role
      }
    }
  }
`;

const DatabaseDemoteMembersModalFormHeader: React.FC = () => {
  const { tableState }: TableStateAndDispatch = modalVar()
    ?.metadata as TableStateAndDispatch;

  const adminsCount: number = tableState.selectedRowIds?.length;
  const title: string = `Demote ${adminsCount} admin(s) to member?`;

  const description: string =
    'Are you sure you want to demote this admin to member? They will be lose all admin priviledges, but will remain in the community as a member. You cannot undo this action at any time.';

  return <FormHeader description={description} title={title} />;
};

const DatabaseDemoteMembersModal: React.FC = () => {
  const [demoteMembers] = useMutation<unknown, DemoteMembersArgs>(
    DEMOTE_MEMBERS
  );

  const onSubmit: OnFormSubmitFunction = async ({
    formDispatch
  }: OnFormSubmitArgs) => {
    const { tableDispatch, tableState }: TableStateAndDispatch = modalVar()
      ?.metadata as TableStateAndDispatch;

    const memberIds: string[] = tableState.selectedRowIds;

    try {
      await demoteMembers({ variables: { memberIds } });
      closeModal();
      showToast({ message: `${memberIds.length} admin(s) demoted to member.` });
      tableDispatch({ type: 'RESET_SELECTED_ROW_IDS' });
    } catch {
      formDispatch({
        error: 'Failed to demote admin(s). Please try again later.',
        type: 'SET_ERROR'
      });
    }
  };

  return (
    <Modal>
      <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
        <DatabaseDemoteMembersModalFormHeader />

        <ModalConfirmationActionRow
          primaryLoadingText="Demoting..."
          primaryText="Demote"
        />
      </Form>
    </Modal>
  );
};

export default DatabaseDemoteMembersModal;
