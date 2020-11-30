/**
 * @fileoverview Component: AddMemberButton
 * @author Rami Abdou
 */

import React, { memo } from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import UnderlineButton from '@components/Button/UnderlineButton';
import Checkbox from '@components/Misc/Checkbox';
import ErrorMessage from '@components/Misc/ErrorMessage';
import Modal from '@components/Modal/Modal';
import { IdProps } from '@constants';
import { useStoreActions } from '@store/Store';
import CSSModifier from '@util/CSSModifier';
import AddMember from './AddMemberButton.store';

const MODAL_ID = 'ADD_MEMBERS';

const AddMemberInput = memo(({ id }: IdProps) => {
  const isShowingErrors = AddMember.useStoreState(
    (store) => store.isShowingErrors
  );
  const admin = AddMember.useStoreState((store) => store.getMember(id)?.admin);
  const email = AddMember.useStoreState((store) => store.getMember(id)?.email);
  const error = AddMember.useStoreState((store) => store.getMember(id)?.error);
  const updateEmail = AddMember.useStoreActions((store) => store.updateEmail);
  const toggleAdmin = AddMember.useStoreActions((store) => store.toggleAdmin);

  const { css } = new CSSModifier('s-database-header-add-modal-email').addClass(
    !!error,
    's-database-header-add-modal-email--error'
  );

  const { css: inputCSS } = new CSSModifier().addClass(
    isShowingErrors && !!error,
    'c-form-input c-form-input--error',
    'c-form-input--dark'
  );

  return (
    <div className={css}>
      <div>
        <input
          className={inputCSS}
          placeholder="Email"
          value={email}
          onChange={({ target }) => updateEmail({ email: target.value, id })}
        />

        <div>
          <Checkbox selected={admin} onClick={() => toggleAdmin(id)} />
          <p>Make Admin</p>
        </div>
      </div>

      {isShowingErrors && error && (
        <ErrorMessage marginBottom={16} message={error} />
      )}
    </div>
  );
});

const AddMemberModal = () => {
  const members = AddMember.useStoreState((store) => store.members);
  const addEmptyMember = AddMember.useStoreActions(
    (store) => store.addEmptyMember
  );
  const clearMembers = AddMember.useStoreActions((store) => store.clearMembers);
  const showErrors = AddMember.useStoreActions((store) => store.showErrors);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  const onAdd = () => {
    if (members.some(({ error }) => !!error)) showErrors();
  };

  return (
    <Modal
      className="s-database-header-add-modal"
      id={MODAL_ID}
      onClose={() => clearMembers()}
    >
      <h1>Add Member(s)</h1>

      <p>
        Type in the email address of the member you want to add to the
        community. We'll send them an email invite with a login link, where they
        can finish filling out their profile.
      </p>

      {members.map(({ id }) => (
        <AddMemberInput key={Math.random()} id={id} />
      ))}

      <UnderlineButton title="+ Add Another" onClick={addEmptyMember} />

      <div>
        <PrimaryButton title="Add" onClick={onAdd} />
        <OutlineButton title="Cancel" onClick={closeModal} />
      </div>
    </Modal>
  );
};

export default () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal({ id: MODAL_ID });

  return (
    <>
      <AddMember.Provider>
        <AddMemberModal />
      </AddMember.Provider>
      <PrimaryButton title="Add Member" onClick={onClick} />
    </>
  );
};
