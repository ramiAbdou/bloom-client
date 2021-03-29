import React from 'react';

import AddMemberStore, {
  AddMemberModel,
  addMemberModel
} from './AddMember.store';
import AddMemberForm from './AddMemberForm';

const AddMemberModal: React.FC<Pick<AddMemberModel, 'admin'>> = ({ admin }) => (
  <AddMemberStore.Provider runtimeModel={{ ...addMemberModel, admin }}>
    <AddMemberForm />
  </AddMemberStore.Provider>
);

export default AddMemberModal;
