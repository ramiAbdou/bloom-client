import React from 'react';

import Form from '@components/organisms/Form/Form';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import FormHeader from '@components/organisms/Form/FormHeader';
import ModalConfirmationActions from '@components/organisms/Modal/ModalConfirmationActions';
import TableStore from '@components/organisms/Table/Table.store';
import { IMember } from '@core/db/db.entities';
import { now } from '@util/util';

const MemberDatabaseDeleteFormHeader: React.FC = () => {
  const memberIds: string[] = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const title: string = `Remove ${memberIds?.length} member(s)?`;

  const description: string =
    'Are you sure you want to remove these member(s)? They will no longer have access to your community and they will not show up in the member database.';

  return <FormHeader description={description} title={title} />;
};

const MemberDatabaseDeleteForm: React.FC = () => {
  const memberIds: string[] = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const onSubmit: OnFormSubmitFunction = async ({
    closeModal,
    gql,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const { error } = await gql.updateMany(IMember, {
      data: { deletedAt: now() },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      where: { id: { _in: memberIds } }
    });

    if (error) {
      setError('Failed to delete member(s). Please try again later.');
      return;
    }

    closeModal();

    showToast({
      message: `${memberIds.length} member(s) removed from the community.`
    });
  };

  return (
    <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
      <MemberDatabaseDeleteFormHeader />

      <ModalConfirmationActions
        primaryLoadingText="Removing..."
        primaryText="Remove"
      />
    </Form>
  );
};

export default MemberDatabaseDeleteForm;
