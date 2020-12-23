import React from 'react';

import Button from '@components/Button/Button';
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
        <Button
          primary
          disabled={!isCompleted}
          loading={isLoading}
          loadingText="Finishing..."
          type="submit"
        >
          Finish
        </Button>
        <Button outline onClick={() => closeModal()}>
          Cancel
        </Button>
      </div>
    </>
  );
};
