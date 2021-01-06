import React from 'react';

import Button from '@atoms/Button';
import { ModalType } from '@constants';
import ActionContainer from '@containers/ActionContainer/ActionContainer';
import Form from '@organisms/Form/Form';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import SubmitButton from '@organisms/Form/FormSubmitButton';
import Modal from '@organisms/Modal/Modal';
import { useStoreActions } from '@store/Store';
import AddMemberStore, { addMemberModel } from './AddMember.store';
import AddMemberInput from './AddMemberInput';
import useCreateMembers from './useCreateMembers';

const AddMemberContent: React.FC = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  const admin = AddMemberStore.useStoreState((store) => store.admin);
  const rows = AddMemberStore.useStoreState((store) => store.rows);
  const addRow = AddMemberStore.useStoreActions((store) => store.addRow);
  const clearRows = AddMemberStore.useStoreActions((store) => store.clearRows);

  const createMembers = useCreateMembers();
  const onClose = () => clearRows();
  const onClick = () => addRow();

  return (
    <Modal id={ModalType.ADD_MEMBERS} width={750} onClose={onClose}>
      <Form className="mo-add-member-form" onSubmit={createMembers}>
        <h1>{admin ? 'Add Admin(s)' : 'Add Member(s)'}</h1>

        <p>
          Type in the email address of the {admin ? 'admin' : 'member'}(s) you
          want to add to the community. We'll send them an email invite with a
          login link, where they can finish filling out their profile.
        </p>

        <div>
          {rows.map((id) => (
            <AddMemberInput key={id} id={id} />
          ))}
        </div>

        <Button tertiary onClick={onClick}>
          + Add Another
        </Button>

        <FormErrorMessage />

        <ActionContainer>
          <SubmitButton fill={false} large={false} loadingText="Adding...">
            Add
          </SubmitButton>

          <Button secondary onClick={() => closeModal()}>
            Cancel
          </Button>
        </ActionContainer>
      </Form>
    </Modal>
  );
};

interface AddMemberModalProps {
  admin?: boolean;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ admin }) => (
  <AddMemberStore.Provider runtimeModel={{ ...addMemberModel, admin }}>
    <AddMemberContent />
  </AddMemberStore.Provider>
);

export default AddMemberModal;
