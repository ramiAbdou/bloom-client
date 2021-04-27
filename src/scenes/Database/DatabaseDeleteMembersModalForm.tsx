import React from 'react';
import { showToast } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Form from '@components/organisms/Form/Form';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import FormHeader from '@components/organisms/Form/FormHeader';
import ModalConfirmationActions from '@components/organisms/Modal/ModalConfirmationActions';
import { useTableState } from '@components/organisms/Table/Table.state';
import { TableState } from '@components/organisms/Table/Table.types';
import { modalVar } from '@core/state/Modal.reactive';
import { IMember } from '@util/constants.entities';
import { now } from '@util/util';

const MemberDatabaseDeleteFormHeader: React.FC = () => {
  const { selectedRowIds } = useTableState();
  const title: string = `Remove ${selectedRowIds?.length} member(s)?`;

  const description: string =
    'Are you sure you want to remove these member(s)? They will no longer have access to your community and they will not show up in the member database.';

  return <FormHeader description={description} title={title} />;
};

const DatabaseDeleteMemberModalForm: React.FC = () => {
  const { selectedRowIds } = useReactiveVar(modalVar)?.metadata as TableState;

  const onSubmit: OnFormSubmitFunction = async ({
    gql,
    setError
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

    modalVar(null);

    showToast({
      message: `${selectedRowIds.length} member(s) removed from the community.`
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

export default DatabaseDeleteMemberModalForm;
