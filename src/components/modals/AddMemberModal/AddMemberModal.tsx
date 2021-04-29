import React from 'react';

import { AddMemberProvider } from './AddMember.state';
import AddMemberForm from './AddMemberForm';

const AddMemberModal: React.FC = () => (
  <AddMemberProvider>
    <AddMemberForm />
  </AddMemberProvider>
);

export default AddMemberModal;
