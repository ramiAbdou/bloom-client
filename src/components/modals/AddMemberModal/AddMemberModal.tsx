import React from 'react';

import Modal from '@components/organisms/Modal/Modal';
import { AddMemberProvider } from './AddMemberModal.state';
import AddMemberForm from './AddMemberModalForm';

const AddMemberModal: React.FC = () => (
  <Modal style={{ width: 750 }}>
    <AddMemberProvider>
      <AddMemberForm />
    </AddMemberProvider>
  </Modal>
);

export default AddMemberModal;
