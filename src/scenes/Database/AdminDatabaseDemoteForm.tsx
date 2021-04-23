import React from 'react';
import { showToast } from 'src/App.reactive';

import Form from '@components/organisms/Form/Form';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import FormHeader from '@components/organisms/Form/FormHeader';
import ModalConfirmationActions from '@components/organisms/Modal/ModalConfirmationActions';
import { useTableState } from '@components/organisms/Table/Table.tracked';
import { modalVar } from '@core/state/Modal.reactive';
import { IMember } from '@util/constants.entities';

const AdminDatabaseDemoteFormHeader: React.FC = () => {
  const title: string = 'Demote to member?';

  const description: string =
    'Are you sure you want to demote this admin to member? They will be lose all admin priviledges, but will remain in the community as a member. You cannot undo this action at any time.';

  return <FormHeader description={description} title={title} />;
};

const AdminDatabaseDemoteForm: React.FC = () => {
  const { selectedRowIds: memberIds } = useTableState();

  const onSubmit: OnFormSubmitFunction = async ({
    gql,
    setError
  }: OnFormSubmitArgs) => {
    const { error } = await gql.updateMany(IMember, {
      data: { role: null },
      where: { id: { _in: memberIds } }
    });

    if (error) {
      setError('Failed to demote admin(s). Please try again later.');
      return;
    }

    modalVar(null);
    showToast({ message: `${memberIds.length} admin(s) demoted to member.` });
  };

  return (
    <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
      <AdminDatabaseDemoteFormHeader />

      <ModalConfirmationActions
        primaryLoadingText="Demoting..."
        primaryText="Demote"
      />
    </Form>
  );
};

export default AdminDatabaseDemoteForm;
