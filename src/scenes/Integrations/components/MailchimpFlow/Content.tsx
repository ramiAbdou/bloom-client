import deepequal from 'fast-deep-equal';
import React from 'react';

import Button from '@atoms/Button';
import FormItem from '@components/Form/components/Item';
import SubmitButton from '@components/Form/components/SubmitButton';
import { useStoreActions, useStoreState } from '@store/Store';
import mailchimp from '../../images/mailchimp.png';

export default () => {
  const mailchimpLists = useStoreState(
    ({ db }) => db.integrations.mailchimpLists,
    deepequal
  );

  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  return (
    <>
      <img
        alt="Mailchimp Icon"
        className="s-integrations-icon--lg"
        src={mailchimp}
      />

      <h1 style={{ marginBottom: -24 }}>Finish Integrating Mailchimp</h1>

      <FormItem
        required
        description="Choose the Mailchimp Audience/List that you would like
          new members to automatically be added to upon joining your
          community."
        options={mailchimpLists.map(({ name }) => name)}
        title="Select Audience/List ID"
        type="MULTIPLE_CHOICE"
      />

      <div className="s-integrations-action-ctr">
        <SubmitButton fill={false} large={false} loadingText="Finishing...">
          Finish
        </SubmitButton>

        <Button outline onClick={() => closeModal()}>
          Cancel
        </Button>
      </div>
    </>
  );
};
