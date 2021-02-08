import deline from 'deline';
import React from 'react';

import Row from '@containers/Row/Row';
import Show from '@containers/Show';
import Form from '@organisms/Form/Form';
import FormMultipleChoice from '@organisms/Form/FormMultipleChoice';
import SubmitButton from '@organisms/Form/FormSubmitButton';
import ModalCloseButton from '@organisms/Modal/ModalCloseButton';
import { useStoreState } from '@store/Store';
import mailchimp from './images/mailchimp.png';
import useMailchimpSubmit from './useMailchimpSubmit';

const MailchimpModalActionContainer: React.FC = () => {
  return (
    <Row>
      <SubmitButton fill={false} large={false} loadingText="Finishing...">
        Finish
      </SubmitButton>

      <ModalCloseButton />
    </Row>
  );
};

const MailchimpModalContent: React.FC = () => {
  const mailchimpLists = useStoreState(({ db }) => {
    return db.integrations.mailchimpLists;
  });

  return (
    <Show show={!!mailchimpLists?.length}>
      <img
        alt="Mailchimp Icon"
        className="s-integrations-icon--lg"
        src={mailchimp}
      />

      <h1 style={{ marginBottom: -24 }}>Finish Integrating Mailchimp</h1>

      <FormMultipleChoice
        description={deline`
          Choose the Mailchimp Audience/List that you would like new members to
          automatically be added to upon joining your community.
        `}
        id="MAILCHIMP_LIST_ID"
        options={mailchimpLists?.map(({ name }) => name)}
        title="Select Audience/List ID"
      />

      <MailchimpModalActionContainer />
    </Show>
  );
};

const IntegrationsMailchimpModal: React.FC = () => {
  const onSubmit = useMailchimpSubmit();

  return (
    <Form className="s-integrations-onboarding-form" onSubmit={onSubmit}>
      <MailchimpModalContent />
    </Form>
  );
};

export default IntegrationsMailchimpModal;
