import React from 'react';

import Button from '@components/atoms/Button/Button';
import Row from '@components/containers/Row/Row';
import Form from '@components/organisms/Form/Form';
import FormErrorMessage from '@components/organisms/Form/FormErrorMessage';
import FormHeader from '@components/organisms/Form/FormHeader';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import { IdProvider } from '@core/state/Id.state';
import { modalVar } from '@core/state/Modal.state';
import AddMemberStore from './AddMember.store';
import AddMemberInput from './AddMemberInput';
import useInviteMembers from './useInviteMembers';

const AddMemberFormActions: React.FC = () => {
  const onSecondaryClick = (): void => {
    modalVar(null);
  };

  return (
    <Row wrap gap="xs">
      <FormSubmitButton
        fill={false}
        large={false}
        loadingText="Adding..."
        showError={false}
      >
        Add
      </FormSubmitButton>

      <Button secondary onClick={onSecondaryClick}>
        Cancel
      </Button>
    </Row>
  );
};

const AddMemberFormAddAnotherButton: React.FC = () => {
  const addRow = AddMemberStore.useStoreActions((state) => state.addRow);

  const onClick = (): void => {
    addRow();
  };

  return (
    <Button tertiary className="mb-md--nlc" onClick={onClick}>
      + Add Another
    </Button>
  );
};

const AddMemberFormRows: React.FC = () => {
  const rows = AddMemberStore.useStoreState((state) => state.rows);

  return (
    <ul>
      {rows.map((id) => (
        <IdProvider key={id} id={id}>
          <AddMemberInput />
        </IdProvider>
      ))}
    </ul>
  );
};

const AddMemberForm: React.FC = () => {
  const addMembers = useInviteMembers();

  return (
    <Form className="mo-add-member-form" onSubmit={addMembers}>
      <FormHeader
        description={`Type in the email address of the member(s) you want to add to the community. We'll send them an email invite with a login link, where they can finish filling out their profile.
        `}
        title="Add Member(s)"
      />

      <AddMemberFormRows />
      <AddMemberFormAddAnotherButton />
      <FormErrorMessage />
      <AddMemberFormActions />
    </Form>
  );
};

export default AddMemberForm;
