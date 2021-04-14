import React from 'react';

import Form from '@components/organisms/Form/Form';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import FormHeader from '@components/organisms/Form/FormHeader';
import ModalConfirmationActions from '@components/organisms/Modal/ModalConfirmationActions';
import TableStore from '@components/organisms/Table/Table.store';
import { IMember, MemberRole } from '@core/db/db.entities';

const MemberDatabasePromoteFormHeader: React.FC = () => {
  const description: string =
    'Are you sure you want to promote these member(s) to admin? They will be granted all admin priviledges. You cannot undo this action at any time.';

  const title: string = 'Promote to admin?';
  return <FormHeader description={description} title={title} />;
};

const MemberDatabasePromoteForm: React.FC = () => {
  const memberIds = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const clearSelectedRows = TableStore.useStoreActions(
    (state) => state.clearSelectedRows
  );

  const onSubmit: OnFormSubmitFunction = async ({
    closeModal,
    gql,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const { error } = await gql.updateMany(IMember, {
      data: { role: MemberRole.ADMIN },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      where: { id: { _in: memberIds } }
    });

    if (error) {
      setError('Failed to promote members. Please try again later.');
      return;
    }

    closeModal();
    showToast({ message: `${memberIds.length} member(s) promoted to admin.` });
    clearSelectedRows();
  };

  return (
    <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
      <MemberDatabasePromoteFormHeader />

      <ModalConfirmationActions
        primaryLoadingText="Promoting..."
        primaryText="Promote"
      />
    </Form>
  );
};

export default MemberDatabasePromoteForm;
