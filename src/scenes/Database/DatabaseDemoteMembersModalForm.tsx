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
import { modalVar } from '@core/state/Modal.reactive';

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

const DatabaseDemoteMembersModalForm: React.FC = () => {
  const [demoteMembers] = useMutation<unknown, DemoteMembersArgs>(
    DEMOTE_MEMBERS
  );

  const onSubmit: OnFormSubmitFunction = async ({
    setError
  }: OnFormSubmitArgs) => {
    const { tableDispatch, tableState }: TableStateAndDispatch = modalVar()
      ?.metadata as TableStateAndDispatch;

    const memberIds: string[] = tableState.selectedRowIds;

    try {
      await demoteMembers({ variables: { memberIds } });
      modalVar(null);
      showToast({ message: `${memberIds.length} admin(s) demoted to member.` });
      tableDispatch({ type: 'RESET_SELECTED_ROW_IDS' });
    } catch {
      setError('Failed to demote admin(s). Please try again later.');
    }
  };

  return (
    <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
      <DatabaseDemoteMembersModalFormHeader />

      <ModalConfirmationActions
        primaryLoadingText="Demoting..."
        primaryText="Demote"
      />
    </Form>
  );
};

export default DatabaseDemoteMembersModalForm;
