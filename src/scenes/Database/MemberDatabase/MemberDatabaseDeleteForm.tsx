import React from 'react';

import Form from '@components/organisms/Form/Form';
import { OnFormSubmitFunction } from '@components/organisms/Form/Form.types';
import FormHeader from '@components/organisms/Form/FormHeader';
import ModalConfirmationActions from '@components/organisms/Modal/ModalConfirmationActions';
import TableStore from '@components/organisms/Table/Table.store';
import useDeleteMembers from './useDeleteMembers';

const MemberDatabaseDeleteFormHeader: React.FC = () => {
  const memberIds = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  return (
    <FormHeader
      description="Are you sure you want to remove these member(s)? They will no longer have access to your community and they will not show up in the member database."
      title={`Remove ${memberIds?.length} member(s)?`}
    />
  );
};

const MemberDatabaseDeleteForm: React.FC = () => {
  const deleteForm: OnFormSubmitFunction = useDeleteMembers();

  return (
    <Form options={{ disableValidation: true }} onSubmit={deleteForm}>
      <MemberDatabaseDeleteFormHeader />

      <ModalConfirmationActions
        primaryLoadingText="Removing..."
        primaryText="Remove"
      />
    </Form>
  );
};

export default MemberDatabaseDeleteForm;
