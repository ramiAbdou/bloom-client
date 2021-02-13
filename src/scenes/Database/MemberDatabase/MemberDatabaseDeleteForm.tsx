import deline from 'deline';
import React from 'react';

import Row from '@containers/Row/Row';
import Form from '@organisms/Form/Form';
import FormHeader from '@organisms/Form/FormHeader';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import ModalCloseButton from '@organisms/Modal/ModalCloseButton';
import TableStore from '@organisms/Table/Table.store';
import useDeleteMembers from './useDeleteMembers';

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

const MemberDatabaseDeleteFormHeader: React.FC = () => {
  const memberIds = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  return (
    <FormHeader
      description={deline`
        Are you sure you want to remove these member(s)? They will no longer
        have access to your community and they will not show up in the member
        database.
      `}
      title={`Remove ${memberIds?.length} member(s)?`}
    />
  );
};

const MemberDatabaseDeleteForm: React.FC = () => {
  const deleteForm = useDeleteMembers();

  return (
    <Form options={{ disableValidation: true }} onSubmit={deleteForm}>
      <MemberDatabaseDeleteFormHeader />
      <MemberDatabaseDeleteFormActions />
    </Form>
  );
};

export default MemberDatabaseDeleteForm;
