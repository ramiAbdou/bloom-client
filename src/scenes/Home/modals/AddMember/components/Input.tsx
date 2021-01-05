import deepequal from 'fast-deep-equal';
import React from 'react';

import { IdProps } from '@constants';
import AddModalInput from '@scenes/Database/AddModalInput';
import { useStoreState } from '@store/Store';
import AddMember from '../AddMember.store';

export default function AddMemberInput({ id }: IdProps) {
  const isOwner = useStoreState(({ db }) => db.isOwner);

  const isShowingErrors = AddMember.useStoreState(
    (store) => store.isShowingErrors
  );

  const member = AddMember.useStoreState(
    (store) => store.getMember(id),
    deepequal
  );

  const deleteMember = AddMember.useStoreActions((store) => store.deleteMember);
  const updateMember = AddMember.useStoreActions((store) => store.updateMember);
  const toggleAdmin = AddMember.useStoreActions((store) => store.toggleAdmin);

  return (
    <AddModalInput
      id={id}
      isShowingErrors={isShowingErrors}
      member={member}
      showAdminCheckbox={isOwner}
      toggleAdmin={toggleAdmin}
      updateMember={updateMember}
      onDelete={() => deleteMember(id)}
    />
  );
}
