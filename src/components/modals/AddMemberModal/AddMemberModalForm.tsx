import React from 'react';

import Button from '@components/atoms/Button/Button';
import Row from '@components/containers/Row/Row';
import Form from '@components/organisms/Form/Form';
import FormErrorMessage from '@components/organisms/Form/FormErrorMessage';
import FormHeader from '@components/organisms/Form/FormHeader';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import { closeModal } from '@components/organisms/Modal/Modal.state';
import { IdProvider } from '@core/state/Id.state';
import { useAddMember } from './AddMemberModal.state';
import AddMemberInput from './AddMemberModalInput';
import useInviteMembers from './useInviteMembers';

const AddMemberFormActions: React.FC = () => {
  const onSecondaryClick = (): void => {
    closeModal();
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
  const [, addMemberDispatch] = useAddMember();

  const onClick = (): void => {
    addMemberDispatch({ type: 'ADD_ROW' });
  };

  return (
    <Button tertiary className="mb-md--nlc" onClick={onClick}>
      + Add Another
    </Button>
  );
};

const AddMemberFormRows: React.FC = () => {
  const [{ rows }] = useAddMember();

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
