import React from 'react';

import Button from '@components/Button/Button';
import SubmitButton from '@components/Form/components/SubmitButton';
import FormContent from '@components/Form/Content';
import Form from '@components/Form/Form.store';
import { useStoreActions } from '@store/Store';
import mailchimp from '../../images/mailchimp.png';

export default () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

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
        <SubmitButton loadingText="Finishing...">Finish</SubmitButton>

        <Button outline onClick={() => closeModal()}>
          Cancel
        </Button>
      </div>
    </>
  );
};
