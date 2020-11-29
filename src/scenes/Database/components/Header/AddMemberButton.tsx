/**
 * @fileoverview Component: AddMemberButton
 * @author Rami Abdou
 */

import React, { useState } from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import UnderlineButton from '@components/Button/UnderlineButton';
import Form from '@components/Form/Form.store';
import Checkbox from '@components/Misc/Checkbox';
import Modal from '@components/Modal/Modal';
import { useStoreActions } from '@store/Store';

const MODAL_ID = 'ADD_MEMBERS';

type NewMemberData = { email: string; admin: boolean };
type AddMemberInputProps = { onClickAdmin: VoidFunction; selected: boolean };

const AddMemberInput = ({ onClickAdmin, selected }: AddMemberInputProps) => {
  return (
    <div className="s-database-header-add-modal-email">
      <input className="c-form-input--dark" placeholder="Email" />
      <div>
        <Checkbox selected={selected} onClick={onClickAdmin} />
        <p>Make Admin</p>
      </div>
    </div>
  );
};

const AddMemberModal = () => {
  // Start with 1 new member that is empty (email is empty string).
  const [newMembers, setNewMembers] = useState<NewMemberData[]>([
    { admin: false, email: '' }
  ]);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  // For each member, this controls the toggle admin functionality.
  const toggleAdmin = (email: string) => {
    const index = newMembers.findIndex((element) => element.email === email);
    const { admin, ...newMember } = newMembers[index];

    // We set the members to be the same except with the admin toggle flipped.
    setNewMembers([
      ...newMembers.slice(0, index),
      { admin: !admin, ...newMember },
      ...newMembers.slice(index + 1)
    ]);
  };

  // When adding another member, we again just add an empty input.
  const onAddAnother = () =>
    setNewMembers([...newMembers, { admin: false, email: '' }]);

  return (
    <Modal className="s-database-header-add-modal" id={MODAL_ID}>
      <Form.Provider>
        <h1>Add Member(s)</h1>

        <p>
          Type in the email address of the member you want to add to the
          community. We'll send them an email invite with a login link, where
          they can finish filling out their profile.
        </p>

        {newMembers.map(({ admin, email }) => (
          <AddMemberInput
            selected={admin}
            onClickAdmin={() => toggleAdmin(email)}
          />
        ))}

        <UnderlineButton title="+ Add Another" onClick={onAddAnother} />

        <div>
          <PrimaryButton title="Add" />
          <OutlineButton title="Cancel" onClick={closeModal} />
        </div>
      </Form.Provider>
    </Modal>
  );
};

export default () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal({ id: MODAL_ID });

  return (
    <>
      <AddMemberModal />
      <PrimaryButton title="Add Member" onClick={onClick} />
    </>
  );
};
