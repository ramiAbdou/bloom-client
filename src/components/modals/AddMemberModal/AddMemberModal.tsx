import React from 'react';

import Modal from '@components/organisms/Modal/Modal';
import { AddMemberProvider } from './AddMemberModal.state';
import AddMemberForm from './AddMemberModalForm';

const AddMemberModal: React.FC = () => (
  <Modal>
    <AddMemberProvider>
      <AddMemberForm />
    </AddMemberProvider>
  </Modal>
);

export default AddMemberModal;
