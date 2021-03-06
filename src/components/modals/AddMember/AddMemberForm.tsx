import React from 'react';

import Button from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import Form from '@organisms/Form/Form';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormHeader from '@organisms/Form/FormHeader';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import IdStore from '@store/Id.store';
import { useStoreActions } from '@store/Store';
import AddMemberStore from './AddMember.store';
import AddMemberInput from './AddMemberInput';
import useInviteMembers from './useInviteMembers';

const AddMemberFormActions: React.FC = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const onSecondaryClick = () => closeModal();

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
  const onClick = () => addRow();

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
        <IdStore.Provider key={id} runtimeModel={{ id }}>
          <AddMemberInput />
        </IdStore.Provider>
      ))}
    </ul>
  );
};

const AddMemberForm: React.FC = () => {
  const admin = AddMemberStore.useStoreState((state) => state.admin);
  const addMembers = useInviteMembers();

  return (
    <Form className="mo-add-member-form" onSubmit={addMembers}>
      <FormHeader
        description={`Type in the email address of the ${
          admin ? 'admin' : 'member'
        }(s) you want to add to the community. We'll send them an email invite with a login link, where they can finish filling out their profile.
        `}
        title={admin ? 'Add Admin(s)' : 'Add Member(s)'}
      />

      <AddMemberFormRows />
      <AddMemberFormAddAnotherButton />
      <FormErrorMessage />
      <AddMemberFormActions />
    </Form>
  );
};

export default AddMemberForm;
