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
import ModalConfirmationActions from '@components/organisms/Modal/ModalConfirmationActions';
import { TableStateAndDispatch } from '@components/organisms/Table/Table.types';

interface PromoteMembersArgs {
  memberIds: string[];
}

const PROMOTE_MEMBERS: DocumentNode = gql`
  mutation PromoteMembers($memberIds: [String!]!) {
    updateMembers(where: { id: { _in: $memberIds } }, _set: { role: "Admin" }) {
      returning {
        id
        role
      }
    }
  }
`;

const DatabasePromoteMembersModalFormHeader: React.FC = () => {
  const title: string = 'Promote to admin?';

  const description: string =
    'Are you sure you want to promote these member(s) to admin? They will be granted all admin priviledges. You cannot undo this action at any time.';

  return <FormHeader description={description} title={title} />;
};

const DatabasePromoteMembersModalForm: React.FC = () => {
  const [promoteMembers] = useMutation<unknown, PromoteMembersArgs>(
    PROMOTE_MEMBERS
  );

  const onSubmit: OnFormSubmitFunction = async ({
    formDispatch
  }: OnFormSubmitArgs) => {
    const { tableDispatch, tableState }: TableStateAndDispatch = modalVar()
      ?.metadata as TableStateAndDispatch;

    const memberIds: string[] = tableState.selectedRowIds;

    try {
      await promoteMembers({ variables: { memberIds } });
      closeModal();

      showToast({
        message: `${memberIds.length} member(s) promoted to admin.`
      });

      tableDispatch({ type: 'RESET_SELECTED_ROW_IDS' });
    } catch {
      formDispatch({
        error: 'Failed to promote members. Please try again later.',
        type: 'SET_ERROR'
      });
    }
  };

  return (
    <Modal>
      <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
        <DatabasePromoteMembersModalFormHeader />

        <ModalConfirmationActions
          primaryLoadingText="Promoting..."
          primaryText="Promote"
        />
      </Form>
    </Modal>
  );
};

export default DatabasePromoteMembersModalForm;
