import deline from 'deline';
import React from 'react';

import Button from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import Form from '@organisms/Form/Form';
import FormHeader from '@organisms/Form/FormHeader';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { useStoreActions } from '@store/Store';
import AddMemberStore from './AddMember.store';
import AddMemberInput from './AddMemberInput';
import useAddMembers from './useAddMembers';

const AddMemberFormActions: React.FC = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const onSecondaryClick = () => closeModal();

  return (
    <Row>
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
  const addRow = AddMemberStore.useStoreActions((store) => store.addRow);
  const onClick = () => addRow();

  return (
    <Button tertiary onClick={onClick}>
      + Add Another
    </Button>
  );
};

const AddMemberFormRows: React.FC = () => {
  const rows = AddMemberStore.useStoreState((store) => store.rows);

  console.log(rows);

  return (
    <ul>
      {rows.map((id) => (
        <AddMemberInput key={id} id={id} />
      ))}
    </ul>
  );
};

const AddMemberForm: React.FC = () => {
  const admin = AddMemberStore.useStoreState((store) => store.admin);
  const addMembers = useAddMembers();

  return (
    <Form className="mo-add-member-form" onSubmit={addMembers}>
      <FormHeader
        description={deline`
          Type in the email address of the ${admin ? 'admin' : 'member'}(s) you
          want to add to the community. We'll send them an email invite with a
          login link, where they can finish filling out their profile.
        `}
        title={admin ? 'Add Admin(s)' : 'Add Member(s)'}
      />

      <AddMemberFormRows />
      <AddMemberFormAddAnotherButton />
      <AddMemberFormActions />
    </Form>
  );
};

export default AddMemberForm;
