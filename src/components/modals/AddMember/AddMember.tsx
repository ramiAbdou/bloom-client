import React from 'react';

import { ModalType } from '@constants';
import Modal from '@organisms/Modal/Modal';
import AddMemberStore, {
  AddMemberModel,
  addMemberModel
} from './AddMember.store';
import AddMemberForm from './AddMemberForm';

const AddMemberContent: React.FC = () => {
  const admin = AddMemberStore.useStoreState((store) => store.admin);
  const clearRows = AddMemberStore.useStoreActions((store) => store.clearRows);
  const onClose = () => clearRows();

  return (
    <Modal
      id={admin ? ModalType.ADD_ADMINS : ModalType.ADD_MEMBERS}
      options={{ width: 750 }}
      onClose={onClose}
    >
      <AddMemberForm />
    </Modal>
  );
};

const AddMemberModal: React.FC<Pick<AddMemberModel, 'admin'>> = ({ admin }) => (
  <AddMemberStore.Provider runtimeModel={{ ...addMemberModel, admin }}>
    <AddMemberContent />
  </AddMemberStore.Provider>
);

export default AddMemberModal;
