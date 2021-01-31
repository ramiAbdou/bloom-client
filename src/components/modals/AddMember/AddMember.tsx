import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import Row from '@containers/Row/Row';
import Form from '@organisms/Form/Form';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import Modal from '@organisms/Modal/Modal';
import { useStoreActions } from '@store/Store';
import AddMemberStore, {
  AddMemberModel,
  addMemberModel
} from './AddMember.store';
import AddMemberInput from './AddMemberInput';
import useAddMembers from './useAddMembers';

const AddMemberContent: React.FC = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  const admin = AddMemberStore.useStoreState((store) => store.admin);
  const rows = AddMemberStore.useStoreState((store) => store.rows);
  const addRow = AddMemberStore.useStoreActions((store) => store.addRow);
  const clearRows = AddMemberStore.useStoreActions((store) => store.clearRows);

  const addMembers = useAddMembers();
  const onClose = () => clearRows();
  const onTertiaryClick = () => addRow();
  const onSecondaryClick = () => closeModal();

  return (
    <Modal
      id={admin ? ModalType.ADD_ADMINS : ModalType.ADD_MEMBERS}
      options={{ width: 750 }}
      onClose={onClose}
    >
      <Form className="mo-add-member-form" onSubmit={addMembers}>
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

        <Button tertiary onClick={onTertiaryClick}>
          + Add Another
        </Button>

        <FormErrorMessage />

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
      </Form>
    </Modal>
  );
};

const AddMemberModal: React.FC<Pick<AddMemberModel, 'admin'>> = ({ admin }) => (
  <AddMemberStore.Provider runtimeModel={{ ...addMemberModel, admin }}>
    <AddMemberContent />
  </AddMemberStore.Provider>
);

export default AddMemberModal;
