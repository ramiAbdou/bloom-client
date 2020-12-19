import React from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import FormContent from '@components/Form/Content';
import Form from '@components/Form/Form.store';
import { useStoreActions } from '@store/Store';
import mailchimp from '../../images/mailchimp.png';

export default () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const isLoading = Form.useStoreState((store) => store.isLoading);

  return (
    <>
      <img
        alt="Mailchimp Icon"
        className="s-integrations-icon--lg"
        src={mailchimp}
      />

      <h1 style={{ marginBottom: -24 }}>Integrate with Mailchimp</h1>
      <FormContent />

      <div className="s-integrations-action-ctr">
        <PrimaryButton disabled={!isCompleted} loading={isLoading}>
          Finish
        </PrimaryButton>
        <OutlineButton onClick={() => closeModal()}>Cancel</OutlineButton>
      </div>
    </>
  );
};
