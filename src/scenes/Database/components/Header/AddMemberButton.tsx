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

const AddMemberInput = () => {
  return (
    <div>
      <input className="c-form-input" placeholder="Email" />
      <div>
        <Checkbox />
        <p>Make Admin</p>
      </div>
    </div>
  );
};

const AddMemberModal = () => {
  const [newMembers, setNewMembers] = useState<NewMemberData[]>([]);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  return (
    <Modal className="s-database-header-add-modal" id={MODAL_ID}>
      <Form.Provider>
        <h1>Add Member(s)</h1>

        <p>
          Type in the email address of the member you want to add to the
          community. We'll send them an email invite with a login link, where
          they can finish filling out their profile.
        </p>

        <AddMemberInput />

        <UnderlineButton title="+ Add Another" />

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
