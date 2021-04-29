import React from 'react';

import Modal from '@components/organisms/Modal/Modal';
import { AddMemberProvider } from './AddMember.state';
import AddMemberForm from './AddMemberForm';

const AddMemberModal: React.FC = () => (
  <Modal>
    <AddMemberProvider>
      <AddMemberForm />
    </AddMemberProvider>
  </Modal>
);

export default AddMemberModal;
