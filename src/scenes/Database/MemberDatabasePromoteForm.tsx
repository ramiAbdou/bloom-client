import React from 'react';
import { showToast } from 'src/App.reactive';

import Form from '@components/organisms/Form/Form';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import FormHeader from '@components/organisms/Form/FormHeader';
import ModalConfirmationActions from '@components/organisms/Modal/ModalConfirmationActions';
import {
  useTableDispatch,
  useTableState
} from '@components/organisms/Table/Table.tracked';
import { modalVar } from '@core/state/Modal.reactive';
import { IMember, MemberRole } from '@util/constants.entities';

const MemberDatabasePromoteFormHeader: React.FC = () => {
  const title: string = 'Promote to admin?';

  const description: string =
    'Are you sure you want to promote these member(s) to admin? They will be granted all admin priviledges. You cannot undo this action at any time.';

  return <FormHeader description={description} title={title} />;
};

const MemberDatabasePromoteForm: React.FC = () => {
  const tableDispatch = useTableDispatch();
  const { selectedRowIds } = useTableState();

  const onSubmit: OnFormSubmitFunction = async ({
    gql,
    setError
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

    modalVar(null);

    showToast({
      message: `${selectedRowIds.length} member(s) promoted to admin.`
    });

    tableDispatch({ type: 'RESET_SELECTED_ROW_IDS' });
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
