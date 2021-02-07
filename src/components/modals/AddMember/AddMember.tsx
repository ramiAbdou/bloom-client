import React from 'react';

import { ModalType } from '@constants';
import Modal from '@organisms/Modal/Modal';
import AddMemberStore, {
  AddMemberModel,
  addMemberModel
} from './AddMember.store';
import AddMemberForm from './AddMemberForm';

const AddMemberModal: React.FC<Pick<AddMemberModel, 'admin'>> = ({ admin }) => {
  return (
    <Modal
      id={admin ? ModalType.ADD_ADMINS : ModalType.ADD_MEMBERS}
      options={{ width: 750 }}
    >
      <AddMemberStore.Provider runtimeModel={{ ...addMemberModel, admin }}>
        <AddMemberForm />
      </AddMemberStore.Provider>
    </Modal>
  );
};

export default AddMemberModal;
