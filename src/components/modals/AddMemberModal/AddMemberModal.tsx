import React from 'react';

import AddMemberStore from './AddMember.store';
import AddMemberForm from './AddMemberForm';

const AddMemberModal: React.FC = () => (
  <AddMemberStore.Provider>
    <AddMemberForm />
  </AddMemberStore.Provider>
);

export default AddMemberModal;
